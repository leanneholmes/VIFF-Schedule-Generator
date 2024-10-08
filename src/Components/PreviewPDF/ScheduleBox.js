import "../../css/Dashboard.css";

import { Text, View, Link } from "@react-pdf/renderer";
import React from "react";
import reactCSS from "reactcss";

const ScheduleBox = (prop) => {
  const convert = require("color-convert");
  const filmTitleTextColor = convert.rgb.hex(
    prop.color.filmTitleText.r,
    prop.color.filmTitleText.g,
    prop.color.filmTitleText.b
  );
  const filmDetailsTextColor = convert.rgb.hex(
    prop.color.filmDetailsText.r,
    prop.color.filmDetailsText.g,
    prop.color.filmDetailsText.b
  );
  const filmBlockColor = convert.rgb.hex(
    prop.color.filmBlock.r,
    prop.color.filmBlock.g,
    prop.color.filmBlock.b
  );

  const r = prop.screen.colour.r;
  const g = prop.screen.colour.g;
  const b = prop.screen.colour.b;

  let width;
  let startPoint;
  const color = `8px solid rgb(${r}, ${g}, ${b})`;
  const screen = prop.screen;
  const startTime = screen.startTime;
  const duration = screen.duration;
  const movieLink = screen.movieLink.trim();

  const now = new Date();
  now.setHours(startTime.substr(0, startTime.indexOf(":")));
  now.setMinutes(startTime.substr(startTime.indexOf(":") + 1));
  now.setSeconds(0);

  const oneDiv = 1 / 64;
  const hourBegin = 8.5;
  const boxNumInHour = 4;
  const boxMin = 15;

  let hour = startTime.substr(0, startTime.indexOf(":"));
  let min = startTime.substr(
    startTime.indexOf(":") + 1,
    startTime.indexOf(":") + 1
  );
  hour = parseInt(hour);
  hour -= hourBegin;
  hour *= boxNumInHour;
  min = parseInt(min);
  min /= boxMin;
  startPoint = ((hour + min) / 64) * 100 * 0.811;
  startPoint += "vw";
  startPoint = ((hour + min) / 64) * 100 * 0.81;
  startPoint += "vw";

  hour = duration.substr(0, duration.indexOf(":"));
  min = duration.substr(duration.indexOf(":") + 1, duration.indexOf(":"));
  hour = duration.substr(0, duration.indexOf(":"));
  min = duration.substr(duration.indexOf(":") + 1, duration.indexOf(":") + 1);
  hour = parseFloat(hour) * boxNumInHour;
  min = parseFloat(min) / boxMin;
  const durationNum = hour + min;
  width = oneDiv * durationNum * 100 * 0.811;
  width = width + "vw";

  const ScreenBoxstyles = reactCSS({
    default: {
      screenBox: {
        height: "103.8%",
        top: "-1.8px",
        position: "absolute",
        width: width,
        marginLeft: startPoint,
        transform: "translateX(-2px)",
        backgroundColor: "#" + filmBlockColor,
        fontFamily: "Helvetica",
        borderTop: "3px solid black",
        borderLeft: "3px dotted black",
        borderBottom: "3px solid black",
        borderRight: color,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      },
    },
  });

  const filmTitleText = {
    color: "#" + filmTitleTextColor,
    fontSize: screen.customized
      ? screen.filmTitleText * 3 + 12 + "pt"
      : prop.font["filmTitleText"]["size"] * 3 + 12 + "pt",
    fontFamily: prop.font["filmTitleText"]["font"],
  };
  const filmDetailsText = {
    color: "#" + filmDetailsTextColor,
    fontSize: prop.font["filmDetailsText"]["size"] * 5.5 + "pt",
    fontFamily: prop.font["filmDetailsText"]["font"],
  };

  const movieStartTime = screen.startTime;
  const [shours, sminutes, sseconds] = movieStartTime.split(":").map(Number);

  const date = new Date();
  date.setHours(shours);
  date.setMinutes(sminutes);
  date.setSeconds(sseconds);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", options);

  const timeString = screen.duration;
  const [hours, minutes] = timeString.split(":").map(Number);
  const durationMinutes = hours * 60 + minutes;

  return (
    <View style={ScreenBoxstyles.screenBox}>
      {movieLink ? (
        <Link
          src={movieLink}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Text style={filmTitleText} numberOfLines={1} ellipsizeMode="tail">
            {screen.filmTitle}
          </Text>
          <Text style={filmDetailsText}>
            {formattedTime} {durationMinutes}min p{screen.pageLocation}{" "}
          </Text>
        </Link>
      ) : (
        <>
          <Text style={filmTitleText} numberOfLines={1} ellipsizeMode="tail">
            {screen.filmTitle}
          </Text>
          <Text style={filmDetailsText}>
            {formattedTime} {durationMinutes}min p{screen.pageLocation}{" "}
          </Text>
        </>
      )}
    </View>
  );
};

export default ScheduleBox;
