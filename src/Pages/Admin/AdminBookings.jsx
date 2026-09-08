import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./adminProduct.css";

// New: satisfies "Access booking requests" and "Oversee cart and
// transaction workflows" — no such page existed before. Reads the
// "bookings" collection (see db.json + CheckoutPage.jsx), which is written
// once at checkout and is separate from the live flightcart/hotelcart —
// otherwise a booking would vanish the moment checkout cleared the cart.
export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const load = () => {
    axios
      .get("http://localhost:8080/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    load();
  }, []);

  const cancelBooking = (id) => {
    axios.delete(`http://localhost:8080/bookings/${id}`).then(load);
  };

  const flightBookings = bookings.filter((b) => b.type === "flight");
  const hotelBookings = bookings.filter((b) => b.type === "hotel");

  const total = bookings.reduce(
    (sum, b) => sum + Number(b.details?.price || 0),
    0
  );

  return (
    <div className="adminProductMain">
      <div className="adminSideBr">
        <h1><Link to={"/admin"}>Dashboard</Link></h1>
        <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
        <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
        <h1><Link to={"/admin/products"}>All Flights</Link></h1>
        <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
        <h1><Link to={"/admin/users"}>All Users</Link></h1>
        <h1><Link to={"/admin/bookings"}>Bookings</Link></h1>
        <h1><Link to={"/"}>Log out</Link></h1>
      </div>
      <div className="adminProductbox">
        <div className="head"><h1>Confirmed Bookings — Flights</h1></div>
        {flightBookings.length === 0 && <p>No flight bookings yet.</p>}
        {flightBookings.map((b) => (
          <div key={b.id} className="adminProductlist">
            <span>{b.details?.airline}</span>
            <span>{b.details?.from} → {b.details?.to}</span>
            <span>₹{b.details?.price}</span>
            <span>{b.bookerName} ({b.bookerNumber})</span>
            <span>{new Date(b.bookedAt).toLocaleString()}</span>
            <span>
              <button onClick={() => cancelBooking(b.id)}>
                Cancel <i className="fa fa-trash"></i>
              </button>
            </span>
          </div>
        ))}

        <div className="head"><h1>Confirmed Bookings — Hotels</h1></div>
        {hotelBookings.length === 0 && <p>No hotel bookings yet.</p>}
        {hotelBookings.map((b) => (
          <div key={b.id} className="adminProductlist">
            <span>{b.details?.name}</span>
            <span>{b.details?.place}</span>
            <span>₹{b.details?.price}</span>
            <span>{b.bookerName} ({b.bookerNumber})</span>
            <span>{new Date(b.bookedAt).toLocaleString()}</span>
            <span>
              <button onClick={() => cancelBooking(b.id)}>
                Cancel <i className="fa fa-trash"></i>
              </button>
            </span>
          </div>
        ))}

        <div className="head"><h1>Total Transaction Value: ₹{total}</h1></div>
      </div>
    </div>
  );
};

export default AdminBookings;
