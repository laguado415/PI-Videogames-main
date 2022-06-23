import axios from "axios";
export const FIND = "find";
export const ORDER = "order";
export const FILTER = "filter";

export const find = (payload) => {
  return async (dispatch) => {
    return axios(`http://localhost:3001/videogames?find[name]=${payload}`)
      .then(({ data }) => dispatch({ type: FIND, payload: data.rows }))
      .catch(({ response }) => console.log(response.data));
  };
};

export const filterAll = (payload) => {
  console.log(payload);
};
