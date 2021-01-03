import React from "react";
import "./DataTable.css";
import numeral from "numeral";

function DataTable({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0.[00]")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default DataTable;
