import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./adminProduct.css";

// New: satisfies "Access ... user details" from the admin spec — there was
// no admin page for users at all before (only Flights and Hotels had one).
export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

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
        <div className="head"><h1>All Users</h1></div>
        {users.map((user, i) => (
          <div key={i} className="adminProductlist">
            <span>{user.user_name}</span>
            <span>{user.number}</span>
            <span>{user.email || "—"}</span>
            <span>{user.gender || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
