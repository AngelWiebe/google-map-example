import { useRef } from "react";
import GoogleMap from "google-maps-react-markers";
import { Stack } from "@mui/material";

import Marker from "./Marker";
import { Therapist } from "../../interfaces/therapist";
import { Coordinates } from "../../interfaces/coordinates";

interface MapProps {
  apiKey: string;
  therapistData: Therapist[];
  center: Coordinates,
  setCenter: (arg0: Coordinates) => void,
}

export default function Map(props: MapProps) {
  const { therapistData, center, setCenter, apiKey } = props;
  const mapRef = useRef(null)

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   */
  const onGoogleApiLoaded = ({ map }: any) => {
    mapRef.current = map
  }

  return (
    <Stack>
      <div style={{ height: "100vh", width: "100vh" }}>
        <GoogleMap
          apiKey={apiKey}
          defaultCenter={center}
          defaultZoom={10}
          onGoogleApiLoaded={onGoogleApiLoaded}
          ref={mapRef}
          options={{
            'center': center // TODO: figure out why this never changes
          }}
        >
          {therapistData.map((data: Therapist, index: number) => 
            <Marker
              onClick={() => setCenter({lat:Number(data.lat), lng: Number(data.lng)})}
              count={index+1}
              id={`inner-map-pin-${data.id}}`}
              lat={Number(data.lat)}
              lng={Number(data.lng)}
            />
          )}
        </GoogleMap>
      </div>
    </Stack>
  );
}
