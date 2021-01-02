// rfce react functional componenet with extentsion
import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography className="infoBox__title" colour="textSecondary">
          {title}
        </Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <Typography
          className="infoBox__total"
          colour="textSecondary"
        ></Typography>
        Total {total}
      </CardContent>
    </Card>
  );
}

export default InfoBox;
