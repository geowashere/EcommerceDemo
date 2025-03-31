import { Card, CardContent, Typography } from "@mui/material";
import { CategoryType } from "../utils/types";

interface CategoryCardProps {
  category: CategoryType;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCardUser: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  return (
    <Card
      className={`transition-all cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500" : "hover:shadow-md"
      }`}
      onClick={onClick}
    >
      <CardContent
        sx={{
          paddingX: 4,
          paddingY: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" className="font-semibold">
          {category.name}
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          {category.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCardUser;
