import {
  FIND,
  ORDER,
  FILTER,
  PAGINATION,
  GENRES,
  MESSAGEFORM,
  ERROR,
  ERRORFORM,
} from "../acctions/actions";
import imageNotFount from "../../image/NOT FOUND.gif";

const videogames = {
  countGames: 0,
  games: [],
  game: [],
  genres: [],
  page: 0,
  url: {
    patch: "http://localhost:3001/videogames?",
    find: "",
    filter: [],
    order: "",
    page: "",
  },
  messageForm: {
    message: "",
    value: false,
  },
  errorMessage: {
    image: imageNotFount,
    value: false,
  },
  errorForm: {
    message: "",
    value: false,
  },
};

export default function reducers(state = videogames, { type, payload }) {
  switch (type) {
    case FIND:
      //---payload { data: [{},{},{},{}] , url: url}------------------
      console.log("find");
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: "",
        errorMessage: { ...state.errorMessage, value: false },
      };
    case FILTER:
      console.log("filter");
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: "",
        errorMessage: { ...state.errorMessage, value: false },
      };
    case ORDER:
      console.log("order");
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        page: "",
      };
    case PAGINATION:
      console.log("pag");
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        page: payload.page,
      };
    case GENRES:
      return {
        ...state,
        genres: [...payload],
        errorForm: {
          message: "",
          value: false,
        },
      };
    case MESSAGEFORM:
      return {
        ...state,
        messageForm: {
          message: payload,
          value: true,
        },
        errorForm: {
          message: "",
          value: false,
        },
      };
    case ERRORFORM:
      return {
        ...state,
        errorForm: {
          message: payload,
          value: true,
        },
        messageForm: {
          message: "",
          value: false,
        },
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
