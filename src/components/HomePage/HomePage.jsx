import React, { useState, useRef, useCallback } from "react";
import { useFetch } from "@/helpers/hookes";
import { convertDate } from "@/helpers/functions";
import pageStyles from "./index.module.scss";
import RepoCard from "../shared/RepoCard/RepoCard";
const HomePage = ({ data }) => {
  const currentDate = convertDate(new Date());
  const perPage = 15;
  const [preLoaded, setPreloaded] = useState(data && true);
  const [query, setQuery] = useState({ perPage: perPage, date: currentDate });
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: Repos,
    lastResult,
    loading,
    error,
  } = useFetch(query, pageNumber, preLoaded, data);

  const observer = useRef();
  const lastRepoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !lastResult) {
          setPreloaded(false);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, lastResult]
  );

  //   function handleSearch(e) {
  //     setQuery(e.target.value);
  //     setPageNumber(1);
  //   }

  return (
    <div className={pageStyles.cardContainer}>
      {/* <input type="text" value={query} onChange={handleSearch}></input> */}
      {Repos?.map((repo, index) => {
        if (Repos?.length - 3 === index) {
          return (
            <RepoCard ref={lastRepoElementRef} key={repo?.id} data={repo} />
          );
        } else {
          return <RepoCard key={repo?.id} data={repo} />;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default HomePage;
