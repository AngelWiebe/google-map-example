import { useState, useEffect } from "react";
import { Typography, TextField, Checkbox, Stack, FormControlLabel } from "@mui/material";

import { Therapist } from "../interfaces/therapist";

interface MapProps {
  therapistData: Therapist[];
}

export default function Search(props: MapProps) {
  const { therapistData } = props;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  let categories = therapistData
    .flatMap(obj => obj.category_name.split(','));
  categories = Array.from(new Set(categories));
  
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

  const [address, setAddress] = useState<string>('');

  console.log('cats', categories);
  return (
    <Stack>
      <Typography marginBottom={2}>Enter your address to find resources near you:</Typography>
      <TextField onChange={(e) => setAddress(e.target.value)} value={address} />
      <Stack>
        {categories.map((category: string) => 
          <FormControlLabel control={<Checkbox checked={isSelected(category)} onClick={() => onCheckboxClick(category)} />} label={category} />
        )}
      </Stack>
    </Stack>
  );
}
