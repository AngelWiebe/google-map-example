import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Stack } from "@mui/material";

import csvDataUrl from './assets/sample-data.csv?url';
import { Therapist } from "./interfaces/therapist";
import Search from "./components/Search";
import Map from "./components/Map"

function App() {
  const [loadedData, setLoadedData] = useState<Therapist[]>([]);

  useEffect(() => {
    const csvData: Therapist[] = [];
    Papa.parse(csvDataUrl, {
      download: true,
      header: true,
      step: function (result: {data: Therapist}) {
        csvData.push(result.data);
      },
      complete: function () {
        setLoadedData(csvData);
      },
    });
  }, []);

  return (
    <Stack flexDirection="row" justifyContent="space-evenly" marginTop={2}>
      <Search therapistData={loadedData} />
      <Map therapistData={loadedData} />
    </Stack>
  )
}

export default App
