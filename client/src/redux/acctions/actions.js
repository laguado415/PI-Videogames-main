import axios from "axios";
export const FIND = "find";
export const ORDER = "order";
export const FILTER = "filter";
export const PAGINATION = "pagination";
export const GENRES = "genres";
export const GAME = "game";
export const ERRORFORM = "errorForm";
export const MESSAGEFORM = "messageForm";
export const ERROR = "error";

export const find = (url, page) => async (dispatch) => {
  //-------------page opcional------------
  return axios(Object.values(url).flat().join(""))
    .then(({ data }) =>
      dispatch({
        type: FIND,
        payload: {
          data: data.rows,
          url: url,
          countGames: data.count,
          page: page ? page : 0,
        },
      })
    )
    .catch(({ response }) =>
      dispatch({
        type: ERROR,
        payload: true,
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
          payload: true,
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

export const genres = () => async (dispatch) => {
  return axios("http://localhost:3001/genres")
    .then(({ data }) =>
      dispatch({
        type: GENRES,
        payload: data,
      })
    )
    .catch(({ response }) =>
      dispatch({
        type: ERRORFORM,
        payload: response.data,
      })
    );
};

export const create = (data) => async (dispatch) => {
  return axios
    .post("http://localhost:3001/videogames", data)
    .then(() =>
      dispatch({ type: MESSAGEFORM, payload: "Se creo el game correctamente" })
    )
    .catch(({ response }) =>
      dispatch({ type: ERRORFORM, payload: response.data })
    );
};

export const gameId = (id) => async (dispatch) => {
  return axios(`http://localhost:3001/videogames/${id}`)
    .then(({ data }) => dispatch({ type: GAME, payload: data }))
    .catch(({ response }) => console.log("error"));
};
