import {
  FIND,
  ORDER,
  FILTER,
  PAGINATION,
  GENRES,
  MESSAGEFORM,
  ERROR,
  ERRORFORM,
  GAME,
} from "../acctions/actions";
import imageNotFount from "../../image/NOT FOUND.gif";
import { baseUrl } from "../../utils/config";

const videogames = {
  countGames: 0,
  games: [],
  game: {},
  genres: [],
  page: 0,
  url: {
    patch: `${baseUrl}/videogames?`,
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
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        countGames: payload.countGames,
        page: payload.page,
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
    case GENRES:
      return {
        ...state,
        genres: [...payload],
        errorForm: {
          message: "",
          value: false,
        },
      };
    case GAME:
      return {
        ...state,
        game: { ...payload },
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
