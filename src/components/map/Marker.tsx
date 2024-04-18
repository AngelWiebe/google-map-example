import React from "react";
import { Stack, Typography } from "@mui/material";

import { Pin } from "./Pin";
import "./Marker.scss";

interface MarkerProps {
  count: number;
  lat: number;
  lng: number;
  onClick: () => void;
}

export default function Marker(props: MarkerProps) {
  const { count, onClick } = props;

  return (
    <Stack className="MapMarker">
      <Stack className="MapMarker__marker">
        <Pin />
        <Typography onClick={onClick}>{count}</Typography>
      </Stack>
    </Stack>
  );
}
