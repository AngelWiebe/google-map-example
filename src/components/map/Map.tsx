import React, { useRef, useEffect, useState } from "react";
import GoogleMap from "google-maps-react-markers";
import { Stack } from "@mui/material";

import Marker from "./Marker";
import { Therapist } from "../../interfaces/therapist";
import { Coordinates } from "../../interfaces/coordinates";

interface MapProps {
  apiKey: string;
  center: Coordinates;
  setClickedPin: (arg0: string) => void;
  therapistData: Therapist[];
}

export default function Map(props: MapProps) {
  const { apiKey, center, setClickedPin, therapistData } = props;
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = useRef<any>(null); // TODO: properly typeset

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   */
  const onGoogleApiLoaded = (map: any) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef?.current?.map.setCenter(center);
  }, [center, mapRef]);

  return (
    <Stack>
      <div style={{ height: "100vh", width: "80vh" }}>
        <GoogleMap
          apiKey={apiKey}
          defaultCenter={center}
          defaultZoom={11}
          onGoogleApiLoaded={onGoogleApiLoaded}
          ref={mapRef}
        >
          {therapistData.map((data: Therapist, index: number) => (
            <Marker
              count={index + 1}
              key={`inner-map-pin-${data.id}`}
              lat={Number(data.lat)}
              lng={Number(data.lng)}
              onClick={() => setClickedPin(`card-${data.id}`)}
            />
          ))}
        </GoogleMap>
      </div>
    </Stack>
  );
}
