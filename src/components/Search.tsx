import { useState, useEffect } from "react";
import { Typography, TextField, Checkbox, Stack, FormControlLabel, Grid } from "@mui/material";

import { Therapist } from "../interfaces/therapist";
import Filters from "./Filters";

interface SearchProps {
  therapistData: Therapist[];
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
}

export default function Search(props: SearchProps) {
  const { therapistData, selectedCategories, setSelectedCategories } = props;
  const [address, setAddress] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const cats = therapistData.flatMap(obj => obj.category_name.split(','));
    setAvailableCategories(Array.from(new Set(cats)));
  }, [therapistData]);
  
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
      <TextField onChange={(e) => setAddress(e.target.value)} value={address} />
      <Filters selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      <Grid container>
        {
          availableCategories.map((category: string) => 
            <Grid item xs={6}>
              <FormControlLabel control={<Checkbox checked={isSelected(category)} onClick={() => onCheckboxClick(category)} />} label={category} />
            </Grid>
        )}
      </Grid>
    </Stack>
  );
}
