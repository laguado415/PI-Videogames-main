import axios from "axios";
export const FIND = "find";
export const ORDER = "order";
export const FILTER = "filter";
export const PAGINATION = "pagination";
export const ERROR = "error";

export const find = (url) => async (dispatch) => {
  return axios(Object.values(url).flat().join(""))
    .then(({ data }) =>
      dispatch({
        type: FIND,
        payload: { data: data.rows, url: url, countGames: data.count },
      })
    )
    .catch(({ response }) =>
      dispatch({
        type: ERROR,
        payload: response.data,
      })
    );
};

export const filter = (url) => {
  return async (dispatch) => {
    return axios(Object.values(url).flat().join(""))
      .then(({ data }) =>
        dispatch({
          type: FILTER,
          payload: { data: data.rows, url: url, countGames: data.count },
        })
      )
      .catch(({ response }) =>
        dispatch({
          type: ERROR,
          payload: response.data,
        })
      );
  };
};

export const order = (url) => {
  return async (dispatch) => {
    return axios(Object.values(url).flat().join(""))
      .then(({ data }) =>
        dispatch({ type: ORDER, payload: { data: data.rows, url: url } })
      )
      .catch(({ response }) => console.log(response.data));
  };
};

export const pagination = (url, page) => {
  return async (dispatch) => {
    return axios(Object.values(url).flat().join(""))
      .then(({ data }) =>
        dispatch({
          type: PAGINATION,
          payload: { data: data.rows, url: url, page: page },
        })
      )
      .catch(({ response }) => console.log(response.data));
  };
};
