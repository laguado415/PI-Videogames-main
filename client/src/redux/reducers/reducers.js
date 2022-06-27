import { FIND, ORDER, FILTER, PAGINATION, ERROR } from "../acctions/actions";
import imageNotFount from "../../image/NOT FOUND.gif";

const videogames = {
  countGames: 0,
  games: [],
  game: [],
  page: 0,
  url: {
    patch: "http://localhost:3001/videogames?",
    find: "",
    filter: [],
    order: "",
    page: "",
  },
  errorMessage: {
    image: imageNotFount,
    value: false,
  },
};

export default function reducers(state = videogames, { type, payload }) {
  switch (type) {
    case FIND:
      //---payload { data: [{},{},{},{}] , url: url}------------------
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: "",
        errorMessage: { ...state.errorMessage, value: false },
      };

    case FILTER:
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: "",
        errorMessage: { ...state.errorMessage, value: false },
      };
    case ORDER:
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        page: "",
      };
    case PAGINATION:
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        page: payload.page,
      };
    case ERROR:
      return {
        ...state,
        countGames: 0,
        games: [],
        page: 0,
        errorMessage: { ...state.errorMessage, value: payload },
      };
    default:
      return state;
  }
}
