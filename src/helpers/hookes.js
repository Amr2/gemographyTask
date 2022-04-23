import { apiCancelToken } from "@/api/api";
import { getRepoes } from "@/api/repo";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (query, pageNumber, preLoaded, preLoadedData) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [lastResult, setLastResult] = useState(false);
  const { date, perPage } = query;

  useEffect(() => {
    setData([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getRepoes(pageNumber, perPage, date)
      .then((res) => {
        setData((prevData) => {
          return [...new Set([...prevData, ...res.items])];
        });
        setLastResult(res.incomplete_results);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        console.log(e);
        setError(true);
      });
    // return () => apiCancelToken();
  }, [query, pageNumber]);

  if (preLoaded === true) {
    // apiCancelToken();
    return {
      data: preLoadedData?.items,
      loading: false,
      error: false,
      lastResult: preLoaded.incomplete_results,
    };
  }
  return { loading, error, data, lastResult };
};
