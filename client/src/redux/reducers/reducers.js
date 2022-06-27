import { FIND, ORDER, FILTER, PAGINATION, ERROR } from "../acctions/actions";

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
  errorMessage: "",
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
        errorMessage: "",
      };

    case FILTER:
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: "",
        errorMessage: "",
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
        errorMessage: payload,
      };
    default:
      return state;
  }
}
