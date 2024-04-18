import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Stack } from "@mui/material";

import csvDataUrl from "./assets/sample-data.csv?url";
import DetailCards from "./components/detailCards/DetailCards";
import Map from "./components/map/Map";
import Search from "./components/search/Search";
import { API_KEY, DEFAULT_COORDS, LIMIT } from "./constants";
import { Coordinates } from "./interfaces/coordinates";
import { Therapist } from "./interfaces/therapist";
import { sortByDistance } from "./utils";

function App() {
  const [center, setCenter] = useState<Coordinates>(DEFAULT_COORDS);
  const [error, setError] = useState<string | null>(null);
  const [clickedPin, setClickedPin] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Therapist[]>([]);
  const [loadedData, setLoadedData] = useState<Therapist[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const csvData: Therapist[] = [];
    Papa.parse(csvDataUrl, {
      download: true,
      header: true,
      step: function (result: { data: Therapist }) {
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

    const filteredCats = [];
    const filteredCatIds = new Set();
    for (const data of loadedData) {
      for (const cat of selectedCategories) {
        if (data.category_name.includes(cat) && !filteredCatIds.has(data.id)) {
          filteredCatIds.add(data.id);
          filteredCats.push(data);
        }
      }
    }

    if (filteredCats.length < 1) {
      setError("No resources match the selected parameters");
      setFilteredData([]);
      return;
    }

    const sorted = sortByDistance(center, filteredCats).splice(0, LIMIT);
    setFilteredData(sorted);
  }, [selectedCategories, loadedData, center]);

  return (
    <Stack flexDirection="row" justifyContent="space-evenly">
      <Search
        apiKey={API_KEY}
        error={error}
        selectedCategories={selectedCategories}
        setCenter={setCenter}
        setError={setError}
        setSelectedCategories={setSelectedCategories}
        therapistData={loadedData}
      />
      <Map
        apiKey={API_KEY}
        center={center}
        setClickedPin={setClickedPin}
        therapistData={filteredData}
      />
      <DetailCards
        clickedPin={clickedPin}
        setCenter={setCenter}
        therapistData={filteredData}
      />
    </Stack>
  );
}

export default App;
