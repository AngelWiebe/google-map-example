import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import "./DetailCards.scss";
import Marker from "../map/Marker";
import { Coordinates } from "../../interfaces/coordinates";
import { Therapist } from "../../interfaces/therapist";

interface DetailProps {
  index: number;
  onClick: () => void;
  therapist: Therapist;
}

function DetailCard(props: DetailProps) {
  const { index, onClick, therapist } = props;

  return (
    <Card id={`card-${therapist.id}`}>
      <CardHeader
        avatar={
          <Marker
            count={index + 1}
            key={`card-pin-${therapist.id}`}
            lat={Number(therapist.lat)}
            lng={Number(therapist.lng)}
            onClick={onClick}
          />
        }
        onClick={onClick}
        title={therapist.name}
        titleTypographyProps={{ fontSize: "large", fontWeight: "bold" }}
      />
      <CardContent>
        <Typography marginBottom={2}>{therapist.address}</Typography>
        <Link
          display="block"
          href={`tel:${therapist.phone}`}
          marginBottom={2}
          rel="noopener noreferrer"
          target="_top"
        >
          {therapist.phone}
        </Link>
        <Link
          display="block"
          href={`mailto:${therapist.email}`}
          marginBottom={2}
          rel="noopener noreferrer"
          target="_top"
        >
          {therapist.email}
        </Link>
        <Link
          display="block"
          href={therapist.url}
          marginBottom={2}
          rel="noopener noreferrer"
          target="_blank"
        >
          {therapist.url}
        </Link>
        <Typography
          className="capitalize"
          marginBottom={2}
        >{`Services Offered: ${therapist.category_name.replace(new RegExp(",", "g"), ", ")}`}</Typography>
      </CardContent>
    </Card>
  );
}

interface DetailsProps {
  clickedPin: string | null;
  setCenter: (arg0: Coordinates) => void;
  therapistData: Therapist[];
}

export default function DetailCards(props: DetailsProps) {
  const { clickedPin, setCenter, therapistData } = props;

  useEffect(() => {
    if (!clickedPin) return;
    const scroll = document.getElementById(clickedPin);
    window.scrollTo({
      top: scroll?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }, [clickedPin]);

  return (
    <Stack maxHeight="100vh" flex="1 1 0px" className="Card__Container">
      {therapistData.map((therapist: Therapist, index: number) => (
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
