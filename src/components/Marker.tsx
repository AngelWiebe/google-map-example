import { Stack } from '@mui/material';

import { Pin } from './Pin';
import './Marker.scss';

interface MarkerProps {
  count: number;
  key: string;
  lat: number;
  lng: number;
}

export default function Marker(props: MarkerProps) {
  const {count, key} = props;
  
    return (
      <Stack className='map-marker' key={key}>
        <Stack className='map-marker__marker'>
          <Pin />
          {count}
        </Stack>
      </Stack>
    );
}