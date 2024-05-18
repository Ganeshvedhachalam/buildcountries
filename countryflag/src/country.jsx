import React, { useEffect, useState } from "react";
const Country = () => {
  const [countries, setcountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchdata, setSearchdata] = useState("");

  const apiUrl = "https://restcountries.com/v3.1/all";

  const Tile = ({ country }) => {
    return (
      <>
        <div
          className="countryCard"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            height: "200px",
            border: "1px solid gray",
            borderRadius: "10px",
            margin: "10px",
            padding: "10px",
          }}
        >
          <img
            style={{ width: "100px", height: "100px" }}
            src={country.flags.png}
            alt="flag"
          />
          <p>
            {" "}
            <span>
              {" "}
              <h2>{country.name.common}</h2>{" "}
            </span>{" "}
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data ");
        }
        return response.json();
      })
      .then((data) => setcountries(data))
      .catch((error) => {
        console.error("Error fetching data : ", error);
        setError(error.message);
      });
  }, []);

  const HandleSearch = (event) => {
    setSearchdata(event.target.value);
  };

  let filteredcountries = countries;
  if (searchdata) {
    filteredcountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchdata.toLowerCase()),
    );
  }

  return (
    <>
      {error ? (
        <div>The Error: {error}</div>
      ) : (
        <div
          className="COUNTRYCARDS"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            // alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="navbar"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className="searchbar"
              value={searchdata}
              onChange={HandleSearch}
              size={70}
              type="text"
              placeholder="search for a country "
            />
          </div>

          {filteredcountries.map((country) => (
            <Tile key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </>
  );
};
export default Country;
