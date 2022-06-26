import { FIND, ORDER, FILTER, PAGINATION } from "../acctions/actions";

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
      };

    case FILTER:
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: "",
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
    default:
      return state;
  }
}
