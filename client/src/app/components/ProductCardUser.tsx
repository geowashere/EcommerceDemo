import { Button, Card, CardContent, Typography } from "@mui/material";
import { ProductType } from "../utils/types";

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
}

const ProductCardUser: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg">
      <CardContent className="flex-grow">
        <div className="mb-4">
          <Typography variant="h6" className="font-bold text-gray-800">
            {product.name}
          </Typography>
        </div>
        <Typography variant="body2" className="text-gray-600 mb-4">
          {product.description}
        </Typography>
      </CardContent>
      <div className="p-3 border-t border-gray-100 flex justify-between items-center">
        <Typography variant="h6" className="font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onAddToCart(product)}
          size="small"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCardUser;
