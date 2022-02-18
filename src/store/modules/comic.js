import { getCurrrentComic, getComicById } from "../../services/ComicAPI";

/**
 * Generate a random rounded number between 1 to maxNumber;
 * @param {number} maxNumber
 * @returns number
 */
const randomNumberByMax = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber) + 1;
};

// initial state
const state = () => ({
  currentComic: null,
  randomComic: null,
});

// getters
const getters = {};

// actions
const actions = {
  async getCurrentComic({ commit }) {
    const currentComic = await getCurrrentComic();
    commit("SET_CURRENT_COMIC", currentComic);
    return currentComic;
  },

  async getRandomComic({ commit, dispatch }) {
    const currentComic = await dispatch("getCurrentComic");
    console.log(
      "🚀 ~ file: comic.js ~ line 37 ~ getRandomComic ~ currentComic",
      currentComic
    );
    const randomNumber = randomNumberByMax(currentComic.num);
    console.log(
      "🚀 ~ file: comic.js ~ line 36 ~ getRandomComic ~ randomNumber",
      randomNumber
    );
    const randomComic = await getComicById(randomNumber);
    console.log(
      "🚀 ~ file: comic.js ~ line 41 ~ getRandomComic ~ randomComic",
      randomComic
    );

    commit("SET_RANDOM_COMIC", randomComic);
    return randomComic;
  },
};

// mutations
const mutations = {
  SET_CURRENT_COMIC(state, currentComic) {
    state.currentComic = currentComic;
  },
  SET_RANDOM_COMIC(state, randomComic) {
    state.randomComic = randomComic;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
