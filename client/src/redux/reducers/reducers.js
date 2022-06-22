import { FIND, ORDER, FILTER } from "../acctions/actions";

const videogames = {
  games: [],
  game: [],
};

export default function reducers(state = videogames, { type, payload }) {
  switch (type) {
    case FIND:
      return { ...state, games: [...payload] };
    default:
      return state;
  }
}
