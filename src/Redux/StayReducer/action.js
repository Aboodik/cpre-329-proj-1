import axios from "axios";
import {
  SELECTED_DATE_AND_CITY,
  SELECTED_CITY,
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
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

//Pick date and city for storing into redux store

export const selectDateAndCity = (checkInDate,checkOutDate) => {
  return { type: SELECTED_DATE_AND_CITY, payload: { checkInDate, checkOutDate } };
};
export const selectCity = (selectedCity) => {
  return { type: SELECTED_CITY, payload: { selectedCity } };
};

// addHotel, fetchingHotels, and DeleteHotel below all used to hit
// happy-sunglasses-eel.cyclic.app — cyclic.sh shut down in 2024, so every
// request here (hotel search, hotel booking, hotel search filters) failed
// outright. All three now point at the local json-server instead.
export const addHotel = (payload) => (dispatch) => {
  dispatch(hotelRequest());

  axios
    .post("http://localhost:8080/hotel", payload)
    .then(() => {
      dispatch(postHotelSuccess());
    })
    .catch((err) => {
      dispatch(hotelFailure());
    });
};

const HOTEL_PAGE_SIZE = 20;

export const fetchingHotels = (sort, order, page = 1) => async (dispatch) => {
  dispatch({ type: HOTEL_REQUEST });
  try {
    // json-server's _sort/_order/_page/_limit combo is unreliable on this
    // version, so fetch the full list and sort/paginate client-side.
    const res = await axios.get(`http://localhost:8080/hotel`);
    let hotels = Array.isArray(res.data) ? res.data : res.data.data || [];
    if (sort) {
      hotels = [...hotels].sort((a, b) =>
        order === "desc" ? b[sort] - a[sort] : a[sort] - b[sort]
      );
    }
    hotels = hotels.slice((page - 1) * HOTEL_PAGE_SIZE, page * HOTEL_PAGE_SIZE);
    dispatch({ type: GET_HOTEL_SUCCESS, payload: hotels });
  } catch (err) {
    dispatch({ type: HOTEL_FAILURE });
    console.log(err);
  }
};





//

export const DeleteHotel = (deleteId) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:8080/hotel/${deleteId}`,
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
