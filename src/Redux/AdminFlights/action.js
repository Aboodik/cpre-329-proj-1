import axios from "axios";
import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
  UPDATE_FLIGHT,
} from "./actionType";

export const getFlightSuccess = (payload) => {
  return { type: GET_FLIGHT_SUCCESS, payload };
};

export const postFlightSuccess = (payload) => {
  return { type: POST_FLIGHT_SUCCESS };
};

export const flightRequest = () => {
  return { type: FLIGHT_REQUEST };
};

export const flightFailure = () => {
  return { type: FLIGHT_FAILURE };
};

//
export const fetch_flights_product = (payload) => {
  return { type: FETCH_FLIGHTS, payload };
};
//
export const handleDeleteProduct = (payload) => {
  return { type: DELETE_FLIGHTS, payload };
};

export const addFlight = (payload) => (dispatch) => {
  dispatch(flightRequest());

  axios
    .post("http://localhost:8080/flight", payload) // https://makemytrip-api-data.onrender.com/flight
    .then(() => {
      dispatch(postFlightSuccess());
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

// Was `?_limit=${limit}` with no `_page` — this json-server version returns
// an empty array whenever _limit is used without _page, so the admin
// flight list was always empty regardless of how much data existed.
// Fetching the full list and slicing client-side sidesteps that bug.
export const fetchFlightProducts = (limit) => (dispatch) => {
  dispatch(flightRequest());
  axios
    .get(`http://localhost:8080/flight`)
    .then((res) => {
      const flights = Array.isArray(res.data) ? res.data : res.data.data || [];
      dispatch(fetch_flights_product(flights.slice(0, limit)));
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

export const updateFlightSuccess = (payload) => {
  return { type: UPDATE_FLIGHT, payload };
};

// Added for the Edit flow — there was previously no update/PATCH action
// for flights at all, so the Edit button had nothing to call into.
export const updateFlight = (id, payload) => (dispatch) => {
  dispatch(flightRequest());

  axios
    .put(`http://localhost:8080/flight/${id}`, payload)
    .then(() => {
      dispatch(updateFlightSuccess({ id, payload }));
    })
    .catch((err) => {
      dispatch(flightFailure());
    });
};

export const DeleteFlightProducts = (deleteId) => async (dispatch) => {
  try {
    // Was `flight?${deleteId}` — a malformed query string instead of a
    // path segment, so DELETE hit the collection endpoint, not the item.
    // It also called res.json() on an axios response (axios already
    // parses to res.data; .json() doesn't exist there), which threw and
    // got silently swallowed by the catch below — so delete never worked
    // even when the request itself would have succeeded.
    await axios(`http://localhost:8080/flight/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(handleDeleteProduct(deleteId));
  } catch (e) {
    console.log(e);
  }
};
