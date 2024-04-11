import { Typography, CardHeader, Card, CardContent, Stack, Link } from "@mui/material";

import { Therapist } from "../interfaces/therapist";
import { Coordinates } from "../interfaces/coordinates";
import Marker from "./map/Marker";

interface DetailProps {
  therapist: Therapist;
  index: number;
  onClick: () => void;
}

function DetailCard(props: DetailProps) {
  const { therapist, index, onClick } = props;

  return (
    <Card key={`card-${therapist.id}`}>
      <CardHeader
        title={therapist.name}
        onClick={onClick}
        avatar={
          <Marker
            count={index + 1}
            id={`card-pin-${therapist.id}`}
            lat={Number(therapist.lat)}
            lng={Number(therapist.lng)}
            onClick={onClick}
        />
        }
      />
      <CardContent>
        <Typography marginBottom={2}>{therapist.address}</Typography>
        <Link marginBottom={2} display="block" target="_top" href={`tel:${therapist.phone}`} rel="noopener noreferrer">
          {therapist.phone}
        </Link>
        <Link marginBottom={2} display="block" target="_top" href={`mailto:${therapist.email}`} rel="noopener noreferrer">
          {therapist.email}
        </Link>
        <Link marginBottom={2} display="block" target="_blank" href={therapist.url} rel="noreferrer">
          {therapist.url}
        </Link>
        <Typography marginBottom={2}>{`Services Offered: ${therapist.category_name.replace(',', ', ')}`}</Typography>
      </CardContent>
    </Card>
  );
}

interface DetailsProps {
  therapistData: Therapist[];
  setCenter: (arg0: Coordinates) => void,
}

export default function DetailCards(props: DetailsProps) {
  const { therapistData, setCenter } = props;

  return (
    <Stack>
      {therapistData.map((therapist: Therapist, index: number) => 
        <DetailCard therapist={therapist} index={index} onClick={() => setCenter({lat:Number(therapist.lat), lng: Number(therapist.lng)})}         />
      )}
    </Stack>
  );
}
