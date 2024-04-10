import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Stack } from "@mui/material";

import csvDataUrl from './assets/sample-data.csv?url';
import { Therapist } from "./interfaces/therapist";
import Search from "./components/Search";
import Map from "./components/Map"

function App() {
  const [loadedData, setLoadedData] = useState<Therapist[]>([]);
  const [filteredData, setFilteredData] = useState<Therapist[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  //TODO: uniquify
  useEffect(() => {
    if (selectedCategories.length < 1) {
      setFilteredData(loadedData);
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
    setFilteredData(filteredCats);
  }, [selectedCategories, loadedData])

  return (
    <Stack flexDirection="row" justifyContent="space-evenly" marginTop={2}>
      <Search therapistData={loadedData} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      <Map therapistData={filteredData} />
    </Stack>
  )
}

export default App
