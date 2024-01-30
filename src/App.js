import React, { useState, useEffect } from "react";
import "./App.css"

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  function handleSearch(e){
    let searchCountry = e.target.value.toLowerCase();
    setSearchTerm(searchCountry);
  }

  const filterCountries = countries.filter((country)=>
  country.name.common.toLowerCase().includes(searchTerm)
  )


  return (
    <div className="container">
      <input type="text" id="searchInput" placeholder="Search countries" onChange={handleSearch}/>
      {filterCountries.map((country) => (
        <div key={country.cca3} className="countryCard">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="imageStyle"
          />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
  );
}
