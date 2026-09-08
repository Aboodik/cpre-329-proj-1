import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FlightCard from "./FlightCard";

// This component previously queried a now-dead third-party demo API with a
// malformed query string (a stray "?" broke the price filter) and never
// filtered by from/to at all, so search results never matched what was
// searched. Now it reads the local json-server API and the from/to the
// user actually searched for.

const PRICE_RANGES = {
  5: [4000, 5000],
  6: [5000, 6000],
  7: [6000, 7000],
  8: [7000, 8000],
};

const PAGE_SIZE = 5;

const getData = async (page, priceValue, from, to) => {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const range = PRICE_RANGES[priceValue];
  if (range) {
    params.price_gte = range[0];
    params.price_lte = range[1];
  }
  // json-server's _page/_limit combo is unreliable on this version, so
  // fetch the filtered list and paginate client-side instead.
  let res = await axios.get(`http://localhost:8080/flight`, { params });
  const all = Array.isArray(res.data) ? res.data : res.data.data || [];
  return all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
};

export default function FlightList({ page, priceValue }) {
  const [data, setData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  useEffect(() => {
    getData(page, priceValue, from, to).then((res) => {
      setData(res);
    });
  }, [page, priceValue, from, to]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <FlightCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
