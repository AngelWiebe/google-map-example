import React, { useCallback, useEffect, useState } from "react";
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
import "./Search.scss";

interface SearchProps {
  apiKey: string;
  error: string | null;
  selectedCategories: string[];
  setCenter: (arg0: Coordinates) => void;
  setError: (arg0: string) => void;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  therapistData: Therapist[];
}

export default function Search({
  apiKey,
  error,
  selectedCategories,
  setCenter,
  setError,
  setSelectedCategories,
  therapistData,
}: SearchProps) {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setKey(apiKey);
  }, [apiKey]);

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
  }, [query, setCenter, setError]);

  const isSelected = useCallback(
    (category: string) => selectedCategories.includes(category),
    [selectedCategories]
  );

  const onCheckboxClick = useCallback(
    (category: string) => {
      setSelectedCategories((prevSelected) =>
        isSelected(category)
          ? prevSelected.filter((cat) => cat !== category)
          : [...prevSelected, category]
      );
    },
    [isSelected, setSelectedCategories]
  );

  return (
    <Stack
      maxHeight="100vh"
      flex="1 1 0px"
      component="section"
      className="Search__Container"
      aria-labelledby="search-section"
    >
      <Stack padding={2} flex="1 1 0px">
        <Typography
          id="search-section"
          className="Search__Label"
          marginBottom={2}
        >
          Enter your address to find resources near you:
        </Typography>
        <TextField
          aria-label="Address search"
          onChange={(e) => {
            setError("");
            setQuery(e.target.value);
          }}
          value={query}
          aria-describedby={error ? "address-error" : undefined}
        />
        {error && (
          <Typography
            aria-label="Address error"
            id="address-error"
            color="error"
            className="Search__Error"
            marginBottom={2}
            marginTop={2}
            role="alert"
          >
            {error}
          </Typography>
        )}
        {selectedCategories.length > 0 && (
          <Filters
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        )}
        <Grid container maxHeight="100vh">
          {availableCategories.map((category: string) => (
            <Grid item xs={6} key={category.replace(" ", "_")}>
              <FormControlLabel
                className="capitalize"
                control={
                  <Checkbox
                    checked={isSelected(category)}
                    onChange={() => onCheckboxClick(category)}
                    inputProps={{ "aria-label": category }}
                  />
                }
                label={category}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
