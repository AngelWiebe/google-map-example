import React, { useCallback } from "react";
import { Typography, Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Filters.scss";

interface FilterProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Filters({
  selectedCategories,
  setSelectedCategories,
}: FilterProps) {
  const deselectAll = useCallback(() => {
    setSelectedCategories([]);
  }, [setSelectedCategories]);

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
    <fieldset>
      <legend className="visually-hidden">Filter Categories</legend>
      <Stack flexDirection="row" flexWrap="wrap" className="Filters__Container">
        {selectedCategories.map((category: string) => (
          <Typography
            key={category.replace(" ", "_")}
            onClick={() => onCheckboxClick(category)}
            aria-label={`Filter: ${category}`}
            className="Filters__Category"
            role="button"
            tabIndex={0}
          >
            {category}
            <DeleteIcon aria-hidden="true" />
          </Typography>
        ))}
        {selectedCategories.length > 1 && (
          <Button
            variant="text"
            onClick={deselectAll}
            className="Filters__Button"
            aria-label="Deselect all filters"
            color="primary"
          >
            Deselect All
            <DeleteIcon aria-hidden="true" />
          </Button>
        )}
      </Stack>
    </fieldset>
  );
}
