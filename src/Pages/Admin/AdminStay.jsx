import "./Admin.Module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addHotel, updateHotel } from "../../Redux/AdminHotel/action";
import { useDispatch } from "react-redux";

let initialState = {
  image: "",
  name: "",
  place: "",
  price: "",
  description: "",
  additional: "",
};
export const AdminStay = () => {
  // Doubles as the "Edit" form: AllHotels navigates here with { editData }
  // when its Edit button is clicked (previously had no onClick at all,
  // and there was no update/PATCH action to call).
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.editData;
  const [hotel, setHotel] = useState(editData || initialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotel((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      dispatch(updateHotel(editData.id, hotel));
      navigate("/admin/hotels");
    } else {
      dispatch(addHotel(hotel));
      setHotel(initialState);
    }
  };

  return (
    <>
      <div className="adminFlightMai">
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
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>{editData ? "Edit Hotel" : "Admin Panel for Hotel"}</h2>
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Hotel Image</label>
                <input
                  type="url"
                  name="image"
                  value={hotel.image}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={hotel.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Place</label>
                <input
                  type="text"
                  name="place"
                  value={hotel.place}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={hotel.price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={hotel.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Additional</label>
                <input
                  type="text"
                  name="additional"
                  value={hotel.additional}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <span></span>
                <button>{editData ? "Save Changes" : "Add Hotel"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

