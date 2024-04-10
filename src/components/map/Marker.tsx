import { Stack, Typography } from '@mui/material';

import { Pin } from './Pin';
import './Marker.scss';

interface MarkerProps {
  count: number;
  key: string;
  lat: number;
  lng: number;
  onClick: () => void;
}

export default function Marker(props: MarkerProps) {
  const {count, key, onClick} = props;
  
    return (
      <Stack className='map-marker' key={key}>
        <Stack className='map-marker__marker'>
          <Pin/>
          <Typography onClick={onClick}>{count}</Typography>
        </Stack>
      </Stack>
    );
}