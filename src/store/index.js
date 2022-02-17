import { createStore, createLogger } from "vuex";
import comic from "./modules/comic";
const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    comic,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
