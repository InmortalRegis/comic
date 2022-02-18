import { proxiedFetch } from "../utils/proxiedFetch";

export const getCurrrentComic = async () =>
  await proxiedFetch("https://xkcd.com/info.0.json", {
    headers: {
      Accept: "application/json",
    },
  }).then((res) => res.json());

export const getComicById = async (comicId) =>
  await proxiedFetch(`https://xkcd.com/${comicId}/info.0.json`, {
    headers: {
      Accept: "application/json",
    },
  }).then((value) => value.json());
