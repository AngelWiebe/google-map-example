import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fromAddress, setKey } from "react-geocode";

import Filters from "./Filters";
import { DEFAULT_COORDS } from "../../constants";
import { Coordinates } from "../../interfaces/coordinates";
import { Therapist } from "../../interfaces/therapist";

interface SearchProps {
  apiKey: string;
  error: string | null;
  selectedCategories: string[];
  setCenter: (arg0: Coordinates) => void;
  setError: (arg0: string) => void;
  setSelectedCategories: (selectedCategories: string[]) => void;
  therapistData: Therapist[];
}

export default function Search(props: SearchProps) {
  const {
    apiKey,
    error,
    selectedCategories,
    setCenter,
    setError,
    setSelectedCategories,
    therapistData,
  } = props;
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setKey(apiKey);
  }, []);

  useEffect(() => {
    const cats = therapistData.flatMap((obj) => obj.category_name.split(","));
    const newSet = Array.from(new Set(cats)).sort((a, b) => a.localeCompare(b));
    setAvailableCategories(newSet);
  }, [therapistData]);

  useEffect(() => {
    if (query.length < 1) setCenter(DEFAULT_COORDS);
    if (query.length < 10) return;

    const timeOutId = setTimeout(() => {
      fromAddress(query)
        .then(({ results }) => {
          setCenter(results[0].geometry.location);
        })
        .catch((e) => {
          console.error(e);
          setCenter(DEFAULT_COORDS);
          setError("Address not found");
        });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const isSelected = (category: string) => {
    return selectedCategories.indexOf(category) > -1;
  };

  const onCheckboxClick = (category: string) => {
    if (isSelected(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => {
          return cat !== category;
        })
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <Stack padding={2} flex="1 1 0px">
      <Typography marginBottom={2}>
        Enter your address to find resources near you:
      </Typography>
      <TextField
        onChange={(e) => {
          setError("");
          setQuery(e.target.value);
        }}
        value={query}
      />
      {error && (
        <Typography color="red" marginBottom={2} marginTop={2}>
          {error}
        </Typography>
      )}
      <Filters
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <Grid container maxHeight="100vh">
        {availableCategories.map((category: string) => (
          <Grid item xs={6} key={category.replace(" ", "_")}>
            <FormControlLabel
              className="capitalize"
              control={
                <Checkbox
                  checked={isSelected(category)}
                  onClick={() => onCheckboxClick(category)}
                />
              }
              label={category}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
