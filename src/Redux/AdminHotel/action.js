import axios from "axios";
import {
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
  UPDATE_HOTEL,
} from "./actionType";

export const getHotelSuccess = (payload) => {
  return { type: GET_HOTEL_SUCCESS, payload };
};

export const postHotelSuccess = (payload) => {
  return { type: POST_HOTEL_SUCCESS };
};

export const hotelRequest = () => {
  return { type: HOTEL_REQUEST };
};

export const hotelFailure = () => {
  return { type: HOTEL_FAILURE };
};

export const fetch_hotel = (payload) => {
  return { type: NEW_GET_HOTELS_SUCCESS, payload };
};

//
export const handleDeleteHotel = (payload) => {
  return { type: DELETE_HOTEL, payload };
};

//

export const addHotel = (payload) => (dispatch) => {
  dispatch(hotelRequest());

  axios
    .post("http://localhost:8080/hotel", payload) // https://makemytrip-api-data.onrender.com/hotel
    .then(() => {
      dispatch(postHotelSuccess());
    })
    .catch((err) => {
      dispatch(hotelFailure());
    });
};

// Was `?_limit=${limit}` with no `_page` — this json-server version returns
// an empty array whenever _limit is used without _page, so the admin
// hotel list was always empty. Fetching the full list and slicing
// client-side sidesteps that.
export const fetchingHotels = (limit) => (dispatch) => {
  axios
    .get(`http://localhost:8080/hotel`)
    .then((res) => {
      const hotels = Array.isArray(res.data) ? res.data : res.data.data || [];
      dispatch(fetch_hotel(hotels.slice(0, limit)));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateHotelSuccess = (payload) => {
  return { type: UPDATE_HOTEL, payload };
};

// Added for the Edit flow — there was previously no update/PATCH action
// for hotels at all, so the Edit button had nothing to call into.
export const updateHotel = (id, payload) => (dispatch) => {
  dispatch(hotelRequest());

  axios
    .put(`http://localhost:8080/hotel/${id}`, payload)
    .then(() => {
      dispatch(updateHotelSuccess({ id, payload }));
    })
    .catch((err) => {
      dispatch(hotelFailure());
    });
};

export const DeleteHotel = (deleteId) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:8080/hotel/${deleteId}`, // https://makemytrip-api-data.onrender.com/hotel/${deleteId}
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    console.log(data);
    dispatch(handleDeleteHotel(deleteId));
  } catch (e) {
    console.log(e);
  }
};
