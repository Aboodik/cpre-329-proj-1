import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.Module.css";


export const AdminDashboard = () => {
  const [flight, setFlight] = useState(0);
  const [hotel, setHotel] = useState(0);
  const [users, setUsers] = useState(0);
  const [giftCard, setGiftCard] = useState(0);
  const [things, setThings] = useState(0);

  const getHotel = () => {
    axios
      .get("http://localhost:8080/flight")
      .then((res) => {
        setFlight(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    //
    axios
      .get("http://localhost:8080/hotel")
      .then((res) => {
        setHotel(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    //
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        setUsers(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("http://localhost:8080/giftcards")
      .then((res) => {
        setGiftCard(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    
      axios
      .get("http://localhost:8080/Things_todo")
      .then((res) => {
        setThings(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    
    
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <div className="mainAdminLandingpage">
        <div className="adminSideBr">
          {/* Was labeled "Home" and linked here too, so clicking it while
              already on this page looked like it did nothing. Same rename
              + new Users/Bookings links applied to every admin page's
              sidebar (they're duplicated per-page, not a shared component). */}
          <h1><Link to={"/admin"}>Dashboard</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/admin/users"}>All Users</Link></h1>
          <h1><Link to={"/admin/bookings"}>Bookings</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="mainBox">
          <div className="mainBoxHead">
            <h1>Admin Dashboard</h1>
            <hr />
            <hr />
            <hr />
          </div>
          <div className="DataBoxes">
            {/* These "View" links used to point at routes that didn't
                exist (/admin/flights, /admin/giftcards, /setThings) or
                looped back to this same page — only Hotels ever worked. */}
            <div className="dataBx">
              <h1>Total Hotel</h1>
              {<h1>{hotel}</h1>}
              <Link to="/admin/hotels">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Flights</h1>
              {<h1>{flight}</h1>}
              <Link to="/admin/products">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Users</h1>
              {<h1>{users}</h1>}
              <Link to="/admin/users">View</Link>
            </div>
            {/* No admin list page exists for Giftcards/Packages (not in
                the required feature set), so the dead "View" link was
                dropped rather than pointing it at a page that isn't there. */}
            <div className="dataBx">
              <h1>Giftcards</h1>
              {<h1>{giftCard}</h1>}
            </div>
            <div className="dataBx">
              <h1>Pakages Available</h1>
              {<h1>{things}</h1>}
            </div>
            {/* New: satisfies "access booking requests / cart & transaction
                workflows" from the admin spec, which had no page at all. */}
            <div className="dataBx">
              <h1>Bookings</h1>
              <Link to="/admin/bookings">View</Link>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
