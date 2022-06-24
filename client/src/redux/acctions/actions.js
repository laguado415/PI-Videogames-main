import axios from "axios";
export const FIND = "find";
export const ORDER = "order";
export const FILTER = "filter";
export const PAGINATION = "pagination";

export const find = (url) => {
  return async (dispatch) => {
    return axios(url.join(""))
      .then(({ data }) =>
        dispatch({
          type: FIND,
          payload: { data: data.rows, url: url, countGames: data.count },
        })
      )
      .catch(({ response }) => console.log(response.data));
  };
};

export const order = (url) => {
  return async (dispatch) => {
    return axios(url.join(""))
      .then(({ data }) =>
        dispatch({ type: ORDER, payload: { data: data.rows, url: url } })
      )
      .catch(({ response }) => console.log(response.data));
  };
};

export const pagination = (url, page) => {
  return async (dispatch) => {
    return axios(url.join(""))
      .then(({ data }) =>
        dispatch({
          type: PAGINATION,
          payload: { data: data.rows, url: url, page: page },
        })
      )
      .catch(({ response }) => console.log(response.data));
  };
};

export const filterAll = (payload) => {
  console.log(payload);
};
