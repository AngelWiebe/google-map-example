import { Typography, CardHeader, Card, CardContent, Stack } from "@mui/material";

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
            key={`$card-pin-{therapist.id}`}
            lat={Number(therapist.lat)}
            lng={Number(therapist.lng)}
            onClick={onClick}
        />
        }
      />
      <CardContent>
        <Typography marginBottom={2}>{`${therapist.address}, ${therapist.city}, ${therapist.postal_code}`}</Typography>
        <Typography marginBottom={2}>{therapist.phone}</Typography>
        <Typography marginBottom={2}>{therapist.email}</Typography>
        <Typography marginBottom={2}>{therapist.url}</Typography>
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
