import React from "react";
import { Card, CardContent, CardHeader, Link, Typography } from "@mui/material";
import Marker from "../map/Marker";
import { Therapist } from "../../interfaces/therapist";

interface DetailProps {
  index: number;
  onClick: () => void;
  therapist: Therapist;
}

export function DetailCard({ index, onClick, therapist }: DetailProps) {
  return (
    <Card
      id={`card-${therapist.id}`}
      component="section"
      className="Card"
      aria-labelledby={`therapist-${therapist.id}`}
    >
      <CardHeader
        avatar={
          <Marker
            count={index + 1}
            lat={Number(therapist.lat)}
            lng={Number(therapist.lng)}
            onClick={onClick}
            aria-label={`Location marker for ${therapist.name}`}
          />
        }
        onClick={onClick}
        title={therapist.name}
        titleTypographyProps={{
          fontSize: "large",
          fontWeight: "bold",
          component: "h2",
          id: `therapist-${therapist.id}`,
        }}
        aria-label={`Details for ${therapist.name}`}
      />
      <CardContent>
        <Typography
          marginBottom={2}
          aria-label={`Address: ${therapist.address}`}
        >
          {therapist.address}
        </Typography>
        <Link
          display="block"
          href={`tel:${therapist.phone}`}
          marginBottom={2}
          rel="noopener noreferrer"
          target="_top"
          aria-label={`Phone number: ${therapist.phone}`}
        >
          {therapist.phone}
        </Link>
        <Link
          display="block"
          href={`mailto:${therapist.email}`}
          marginBottom={2}
          rel="noopener noreferrer"
          target="_top"
          aria-label={`Email: ${therapist.email}`}
        >
          {therapist.email}
        </Link>
        <Link
          display="block"
          href={therapist.url}
          marginBottom={2}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={`Website: ${therapist.url}`}
        >
          {therapist.url}
        </Link>
        <Typography
          className="capitalize"
          marginBottom={2}
          aria-label={`Services Offered: ${therapist.category_name.replace(/,/g, ", ")}`}
        >
          {`Services Offered: ${therapist.category_name.replace(/,/g, ", ")}`}
        </Typography>
      </CardContent>
    </Card>
  );
}
