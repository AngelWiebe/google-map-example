import { useState, useEffect } from "react";
import { Typography, TextField, Checkbox, Stack, FormControlLabel, Grid } from "@mui/material";
import { setKey, fromAddress } from "react-geocode";

import { Therapist } from "../interfaces/therapist";
import Filters from "./Filters";
import { Coordinates } from "../interfaces/coordinates";
import { DEFAULT_COORDS } from "../constants";

interface SearchProps {
  apiKey: string;
  error: string | null;
  setError: (arg0: string) => void;
  setCenter: (arg0: Coordinates) => void;
  therapistData: Therapist[];
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
}

export default function Search(props: SearchProps) {
  const { apiKey, error, setError, setCenter, selectedCategories, setSelectedCategories, therapistData } = props;
  const [query, setQuery] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    setKey(apiKey);
  }, []);

  useEffect(() => {
    const cats = therapistData.flatMap(obj => obj.category_name.split(','));
    setAvailableCategories(Array.from(new Set(cats)));
  }, [therapistData]);
 
  useEffect(() => {
    if (query.length < 4) {
      setCenter(DEFAULT_COORDS);
      return;
    }

    const timeOutId = setTimeout(() => {
      fromAddress(query)
      .then(({ results }) => {
        setCenter(results[0].geometry.location);
      })
        .catch((e) => {
          console.error(e);
          setError('Address not found');
        });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  
  const isSelected = (category: string) => {
    return selectedCategories.indexOf(category) > -1;
  }

  const onCheckboxClick = (category: string) => {
    if (isSelected(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => {
        return cat !== category;
      }));
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <Stack paddingRight={3} paddingLeft={3}>
      <Typography marginBottom={2}>Enter your address to find resources near you:</Typography>
      <TextField onChange={(e) => { setQuery(e.target.value); setError(''); }} value={query} />
      {error && <Typography marginBottom={2} marginTop={2} color="red">{error}</Typography>}
      <Filters selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      <Grid container>
        {
          availableCategories.map((category: string) => 
            <Grid item xs={6} key={category.replace(' ', '_')}>
              <FormControlLabel control={<Checkbox checked={isSelected(category)} onClick={() => onCheckboxClick(category)} />} label={category} />
            </Grid>
        )}
      </Grid>
    </Stack>
  );
}
