import { useDrag, useDrop } from "react-dnd";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material";
import { useRef } from "react";
import { CategoryType, DragItem, ItemTypes } from "../utils/types";
import { Identifier, XYCoord } from "dnd-core";

interface CategoryCardProps {
  category: CategoryType;
  index: number;
  isSelected: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  onDrop: () => void;
}

const CategoryCardAdmin: React.FC<CategoryCardProps> = ({
  category,
  index,
  isSelected,
  onEdit,
  onDelete,
  moveCategory,
  onDrop,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CATEGORY,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!cardRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = cardRef.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCategory(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CATEGORY,
    item: () => ({ id: category.id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrop();
      }
    },
  });

  drag(drop(cardRef));

  return (
    <div
      ref={cardRef}
      className="cursor-move"
      style={{ touchAction: "none", opacity: isDragging ? 0.6 : 1 }}
      data-handler-id={handlerId}
    >
      <Card
        className={`transition-all ${
          isSelected ? "ring-2 ring-blue-500" : "hover:shadow-md"
        }`}
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
          <div className="flex justify-between items-start gap-12 w-[100%]">
            <Typography variant="h6" className="font-semibold">
              {category.name}
            </Typography>

            <div className="flex space-x-1">
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(category.id);
                  }}
                >
                  <EditIcon fontSize="small" className="text-blue-500" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(category.id);
                  }}
                >
                  <DeleteIcon fontSize="small" className="text-red-500" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Drag to reorder">
                <IconButton
                  size="small"
                  className="cursor-grab active:cursor-grabbing"
                  sx={{ touchAction: "none" }}
                >
                  <DragIcon fontSize="small" className="text-gray-500" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <Typography variant="body2" className="text-gray-600">
            {category.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryCardAdmin;
