import api from "./api";

export const getRepoes = async (pages, perPage, date) => {
  const { data: repoes } = await api.get(
    `/search/repositories?${
      date && `q=created:${date}`
    }&page=${pages}&per_page=${perPage}&sort=stars&order=desc`
  );

  return repoes;
};
