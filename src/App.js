import React, { useState, useEffect } from "react";
import "./App.css";
import DataTable from "./DataTable";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import { sortData } from "./until";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  // same as countries = new ArrayList();, setCountries(){};
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  // Runs the code base on the conditions. Code only runs once when the component loads and not again
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setCountries(countries);
          console.log(data);
          setTableData(sortData);
        });
    };
    getCountriesData();
  }, []);

  // To load the initial world wide data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (e) => {
    const countryName = e.target.value;
    const url =
      countryName == "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryName}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryName);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>SARS-CoV-2-Dashboard</h1>
          <FormControl className="app__dropDown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="COVID-19 Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="COVID-19 Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <DataTable countries={tableData} />
            {/* <h3>Worldwide new {casesType}</h3> */}
            {/* <LineGraph casesType={casesType} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
