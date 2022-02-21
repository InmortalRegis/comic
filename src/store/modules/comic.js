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
  async getRandomComic({ commit }) {
    try {
      const currentComic = await getCurrrentComic();
      console.log(
        "🚀 ~ file: comic.js ~ line 26 ~ getRandomComic ~ currentComic",
        currentComic
      );

      const randomNumber = randomNumberByMax(currentComic.data.num);

      const randomComic = await getComicById(randomNumber);

      commit("SET_RANDOM_COMIC", randomComic.data);
      return randomComic;
    } catch (error) {
      if (error.response.status === 403) {
        throw new Error(
          "Please go to https://cors-anywhere.herokuapp.com and press 'Request temporary access to the demo server' button"
        );
      }
    }
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
