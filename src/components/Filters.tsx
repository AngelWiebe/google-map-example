import { Typography, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface FilterProps {
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
}

export default function Filters(props: FilterProps) {
  const { selectedCategories, setSelectedCategories } = props;

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

  const deselectAll = () => {
    setSelectedCategories([]);
  }

  return (
    <Stack flexDirection="row">
      {
        selectedCategories.map((category: string) => 
          <Typography onClick={() => onCheckboxClick(category)}>{category}<DeleteIcon /></Typography>
      )}
      {selectedCategories.length > 1 && (
        <Typography onClick={() => deselectAll()}>Deselect All
          <DeleteIcon />
        </Typography>
      )}
    </Stack>
  );
}
