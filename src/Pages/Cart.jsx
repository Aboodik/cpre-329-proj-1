import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Flex, Image, Heading, Text, Button } from "@chakra-ui/react";

// New: "Cart Section" from the spec had no page or route at all before —
// flightcart/hotelcart existed as db.json collections and items could be
// added to them, but nothing anywhere ever read them back for display.
const Cart = () => {
  const [flightItems, setFlightItems] = useState([]);
  const [hotelItems, setHotelItems] = useState([]);

  const loadCart = () => {
    axios
      .get("http://localhost:8080/flightcart")
      .then((res) => setFlightItems(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8080/hotelcart")
      .then((res) => setHotelItems(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeFlight = (id) => {
    axios
      .delete(`http://localhost:8080/flightcart/${id}`)
      .then(() => loadCart());
  };

  const removeHotel = (id) => {
    axios
      .delete(`http://localhost:8080/hotelcart/${id}`)
      .then(() => loadCart());
  };

  const total =
    flightItems.reduce((sum, f) => sum + Number(f.price || 0), 0) +
    hotelItems.reduce((sum, h) => sum + Number(h.price || 0), 0);

  const isEmpty = flightItems.length === 0 && hotelItems.length === 0;

  return (
    <Box width="85%" margin="auto" my={10}>
      <Heading fontSize="26px" mb={5}>
        Your Cart
      </Heading>

      {isEmpty && <Text>Your cart is empty.</Text>}

      {flightItems.map((flight) => (
        <Flex
          key={flight.id}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          padding="15px"
          borderRadius="10px"
          marginBottom="15px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Heading fontSize="18px">{flight.airline}</Heading>
            <Text>
              {flight.from} → {flight.to}
            </Text>
            <Text>
              {flight.departure} - {flight.arrival} ({flight.totalTime})
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontWeight="bold">₹{flight.price}</Text>
            <Button
              size="sm"
              colorScheme="red"
              mt={2}
              onClick={() => removeFlight(flight.id)}
            >
              Remove
            </Button>
          </Box>
        </Flex>
      ))}

      {hotelItems.map((hotel) => (
        <Flex
          key={hotel.id}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          padding="15px"
          borderRadius="10px"
          marginBottom="15px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap="15px">
            <Image src={hotel.image} width="80px" height="60px" objectFit="cover" />
            <Box>
              <Heading fontSize="18px">{hotel.name}</Heading>
              <Text>{hotel.place}</Text>
            </Box>
          </Flex>
          <Box textAlign="right">
            <Text fontWeight="bold">₹{hotel.price}</Text>
            <Button
              size="sm"
              colorScheme="red"
              mt={2}
              onClick={() => removeHotel(hotel.id)}
            >
              Remove
            </Button>
          </Box>
        </Flex>
      ))}

      {!isEmpty && (
        <Flex justifyContent="space-between" mt={5} alignItems="center">
          <Heading fontSize="20px">Total: ₹{total}</Heading>
          <Link to="/checkout">
            <Button colorScheme="blue">Proceed to Checkout</Button>
          </Link>
        </Flex>
      )}
    </Box>
  );
};

export default Cart;
