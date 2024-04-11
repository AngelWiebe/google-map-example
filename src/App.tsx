import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Stack } from "@mui/material";

import csvDataUrl from './assets/sample-data.csv?url';
import { Therapist } from "./interfaces/therapist";
import { Coordinates } from "./interfaces/coordinates";
import Search from "./components/Search";
import Map from "./components/map/Map"
import DetailCards from "./components/DetailCards";
import { sortByDistance } from './utils';
import { API_KEY, LIMIT, DEFAULT_COORDS } from "./constants";

function App() {
  const [loadedData, setLoadedData] = useState<Therapist[]>([]);
  const [center, setCenter] = useState<Coordinates>(DEFAULT_COORDS);
  const [filteredData, setFilteredData] = useState<Therapist[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (selectedCategories.length < 1) {
      const sorted = sortByDistance(center, loadedData).splice(0, LIMIT);
      setFilteredData(sorted);
      return;
    }

    let filteredCatIds = new Set();
    let filteredCats = [];
    for (const data of loadedData) {
      for (const cat of selectedCategories) {
        if (data.category_name.includes(cat) && !filteredCatIds.has(data.id)) {
          filteredCatIds.add(data.id);
          filteredCats.push(data);
        }
      }
    }

    if (filteredCats.length < 1) {
      setError('No resources match the selected parameters');
      setFilteredData([]);
      return;
    }

    const sorted = sortByDistance(center, filteredCats).splice(0, LIMIT);
    setFilteredData(sorted);
  }, [selectedCategories, loadedData, center])

  return (
    <Stack flexDirection="row" justifyContent="space-evenly" marginTop={2}>
      <Search
        apiKey={API_KEY}
        error={error}
        setError={setError}
        setCenter={setCenter}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        therapistData={loadedData}
      />
      <Map apiKey={API_KEY} center={center} setCenter={setCenter} therapistData={filteredData} />
      <DetailCards therapistData={filteredData} setCenter={setCenter} />
    </Stack>
  )
}

export default App
