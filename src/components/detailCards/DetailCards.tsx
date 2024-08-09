import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { DetailCard } from "./DetailCard";
import { Coordinates } from "../../interfaces/coordinates";
import { Therapist } from "../../interfaces/therapist";
import "./DetailCards.scss";

interface DetailsProps {
  clickedPin: string | null;
  setCenter: (arg0: Coordinates) => void;
  therapistData: Therapist[];
}

export default function DetailCards({
  clickedPin,
  setCenter,
  therapistData,
}: DetailsProps) {
  useEffect(() => {
    if (clickedPin) {
      const scroll = document.getElementById(clickedPin);
      if (scroll) {
        window.scrollTo({
          top: scroll.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [clickedPin]);

  return (
    <Stack
      maxHeight="100vh"
      flex="1 1 0px"
      className="Card__Container"
      component="section"
      aria-labelledby="therapist-list"
      sx={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 2,
        overflowY: "auto",
      }}
    >
      <h1 id="therapist-list" className="visually-hidden">
        List of Therapists
      </h1>
      {therapistData.map((therapist, index) => (
        <DetailCard
          index={index}
          key={therapist.id}
          onClick={() =>
            setCenter({
              lat: Number(therapist.lat),
              lng: Number(therapist.lng),
            })
          }
          therapist={therapist}
        />
      ))}
    </Stack>
  );
}
