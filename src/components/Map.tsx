import { useRef } from "react";
import GoogleMap from "google-maps-react-markers";
import { Stack } from "@mui/material";

import Marker from "./Marker";
import { Therapist } from "../interfaces/therapist";

interface MapProps {
  therapistData: Therapist[];
}

export default function Map(props: MapProps) {
  const { therapistData } = props;
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY || "";
  const mapRef = useRef(null)

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map }: any) => {
    mapRef.current = map
  }

  return (
    <Stack>
      <div style={{ height: "100vh", width: "100vh" }}>
        <GoogleMap
          apiKey={apiKey}
          defaultCenter={{ lat: 51.049999, lng: -114.066666 }}
          defaultZoom={10}
          onGoogleApiLoaded={onGoogleApiLoaded}
          ref={mapRef}
        >
          {therapistData.map((data: Therapist, index: number) => 
            <Marker
              count={index+1}
              key={data.id}
              lat={Number(data.lat)}
              lng={Number(data.lng)}
            />
          )}
        </GoogleMap>
      </div>
    </Stack>
  );
}
