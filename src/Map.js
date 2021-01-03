import React from "react";
import "./Map.css";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import numeral from "numeral";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ worldwideInfo, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {worldwideInfo.map((countryData) => (
          <CircleMarker
            center={[countryData.countryInfo.lat, countryData.countryInfo.long]}
            pathOptions={{ color: "red" }}
            radius={countryData.casesPerOneMillion / 1000}
            fillOpacity={
              countryData.casesPerOneMillion / 1000 > 50 ? 0.75 : 0.15
            }
          >
            <Tooltip className="popup-container">
              <div>
                <div className="popup-container__country">
                  {countryData.country}
                </div>
                <div
                  className="popup-container__flag"
                  style={{
                    backgroundImage: `url(${countryData.countryInfo.flag})`,
                  }}
                ></div>
                <div className="popup-container__cases">
                  <strong>Cases: </strong>
                  {numeral(countryData.cases).format("0,0.[00]")}
                </div>
                <div className="popup-container__death">
                  <strong>Deaths: </strong>
                  {numeral(countryData.deaths).format("0,0.[00]")}
                </div>
                <div className="popup-container__recovered">
                  <strong>Recovered: </strong>
                  {numeral(countryData.recovered).format("0,0.[00]")}
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </LeafletMap>
    </div>
  );
}

export default Map;
