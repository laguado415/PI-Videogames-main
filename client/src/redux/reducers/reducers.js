import axios from "axios";
import { FIND, ORDER, FILTER, PAGINATION } from "../acctions/actions";

const videogames = {
  countGames: 0,
  games: [],
  game: [],
  page: 0,
  //--------------[0]---[1]---[2]-----[3]----[4]-------------------
  //-----------  path  find  filter  order  page-------------------
  url: ["http://localhost:3001/videogames?"],
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
        page: 0,
      };
    case ORDER:
      return {
        ...state,
        games: [...payload.data],
        url: payload.url,
        page: 0,
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
