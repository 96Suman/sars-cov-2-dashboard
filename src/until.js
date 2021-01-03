import React from "react";
import { Popup, Circle, CircleMarker, Tooltip } from "react-leaflet";

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const showCovidDataInMap = (worldwideInfo, casesType = "cases") => {
  console.log(worldwideInfo);
  worldwideInfo.map((countryData) => (
    <CircleMarker
      center={[countryData.countryInfo.lat, countryData.countryInfo.long]}
      pathOptions={{ color: "red" }}
      radius={20}
    >
      <Tooltip>Tooltip for CircleMarker</Tooltip>
    </CircleMarker>
  ));
};
