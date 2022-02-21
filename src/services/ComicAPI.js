import { proxiedFetch } from "../utils/proxiedFetch";

export const getCurrrentComic = async () =>
  await proxiedFetch("https://xkcd.com/info.0.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

export const getComicById = async (comicId) =>
  await proxiedFetch(`https://xkcd.com/${comicId}/info.0.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
