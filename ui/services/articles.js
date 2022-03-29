import { callAPI } from "../utils/api";

export const getArticles = async () =>
  callAPI("/article", {
    limit: 5,
  });

export const addArticle = async (data) => callAPI("/article", data, "POST");
