import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { fetchingHotels } from "../../Redux/StayReducer/action";
import "./StayData.css";
import PriceFilter from "./PriceFilter";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

const StayData = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { data } = useSelector((store) => store.StayReducer);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
  const [filteredHotel, setFilteredHotel] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalNumOfPages = Math.ceil(244 / 20);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // This button used to be labeled "We have 5 left" and actually deleted
  // the hotel from the list (dispatch(DeleteHotel)) — there was no booking
  // action at all, just a mislabeled delete.
  const handleBookHotel = (hotel) => {
    axios
      .post("http://localhost:8080/hotelcart", hotel)
      .then(() => {
        toast({
          title: "Hotel Added to Cart",
          description: "Please Proceed to Payment",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Could not add hotel to cart",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (data) {
      setFilteredHotel(
        data.filter(
          (hotel) =>
            hotel.price >= selectedPriceRange[0] &&
            hotel.price <= selectedPriceRange[1]
        )
      );
    }
  }, [data, selectedPriceRange]);
  return (
    <div className="stay-data">
      
      <div className="sidebar-container">
        <Sidebar/>
      </div>

      {filteredHotel?.map((hotel) => (
        <div className="stay-card" key={hotel.id}>
          <img src={hotel.image} alt="hotel" />

          <div className="stay-info">
            <div className="stay-header">
              <h3 className="stay-name">{hotel.name}</h3>
              <button
                className="stay-left-btn"
                onClick={() => handleBookHotel(hotel)}
              >
                Book Now
              </button>
            </div>
            {/* Was hotel.location — that field doesn't exist on hotel
                records (it's "place"), so this always rendered blank. */}
            <p className="stay-location">{hotel.place}</p>
            <p className="stay-description">{hotel.description}</p>
            <div className="stay-details">
              <div className="stay-price">
                <span>Price:</span>
                <p>₹{hotel.price.toLocaleString()}</p>
              </div>
              <div className="stay-rating">
                <span>Rating:</span>
                <p>{hotel.rating ? hotel.rating : 1}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={totalNumOfPages}
      />
      </div>
    </div>
  );
};

export default StayData;