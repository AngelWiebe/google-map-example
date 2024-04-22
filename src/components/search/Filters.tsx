import React, { useCallback } from "react";
import { Typography, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface FilterProps {
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
}

export default function Filters(props: FilterProps) {
  const { selectedCategories, setSelectedCategories } = props;

  const deselectAll = useCallback(() => {
    setSelectedCategories([]);
  }, [setSelectedCategories]);

  const isSelected = useCallback(
    (category: string) => {
      return selectedCategories.indexOf(category) > -1;
    },
    [selectedCategories]
  );

  const onCheckboxClick = useCallback(
    (category: string) => {
      if (isSelected(category)) {
        setSelectedCategories(
          selectedCategories.filter((cat) => {
            return cat !== category;
          })
        );
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    },
    [isSelected, setSelectedCategories, selectedCategories]
  );

  return (
    <Stack flexDirection="row" flexWrap="wrap">
      {selectedCategories.map((category: string) => (
        <Typography
          key={category.replace(" ", "_")}
          onClick={() => onCheckboxClick(category)}
        >
          {category}
          <DeleteIcon />
        </Typography>
      ))}
      {selectedCategories.length > 1 && (
        <Typography onClick={() => deselectAll()}>
          Deselect All
          <DeleteIcon />
        </Typography>
      )}
    </Stack>
  );
}
