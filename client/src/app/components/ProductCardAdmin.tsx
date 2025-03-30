import {
  IconButton,
  Card,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material";
import { DragItem, ItemTypes, ProductType } from "../utils/types";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { Identifier, XYCoord } from "dnd-core";

interface ProductCardProps {
  product: ProductType;
  index: number;
  onEdit: () => void;
  onDelete: (id: number) => void;
  moveProduct: (dragIndex: number, hoverIndex: number) => void;
  onDrop: () => void;
}

const ProductCardAdmin: React.FC<ProductCardProps> = ({
  product,
  index,
  onEdit,
  onDelete,
  moveProduct,
  onDrop,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.PRODUCT,
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

      moveProduct(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PRODUCT,
    item: () => ({ id: product.id, index }),
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
      style={{ opacity: isDragging ? 0.6 : 1 }}
      data-handler-id={handlerId}
    >
      <Card className="h-full flex flex-col transition-all hover:shadow-lg">
        <CardContent className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <Typography variant="h6" className="font-bold text-gray-800">
              {product.name}
            </Typography>
            <div className="flex space-x-1">
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => onEdit()}>
                  <EditIcon fontSize="small" className="text-blue-500" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => onDelete(product.id)}>
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
          <Typography variant="body2" className="text-gray-600 mb-4">
            {product.description}
          </Typography>
        </CardContent>
        <div className="p-3 border-t border-gray-100">
          <Typography
            variant="h6"
            className="font-bold text-blue-600 text-right"
          >
            ${product.price.toFixed(2)}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardAdmin;
