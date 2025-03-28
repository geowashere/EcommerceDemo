import { Button } from "@mui/material";

import { Product as ProductType } from "../api/productService";

interface ProductProps {
  product: ProductType;
  // onDelete: () => void;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  if (product) {
    return (
      <div className="flex flex-col gap-3 w-[80%] bg-[#ccc] rounded-lg p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="font-bold text-2xl">${product.price}</p>
        </div>
        <div className="flex justify-between">
          <p className="w-[72%]">{product.description}</p>
          <Button variant="contained">Add To Cart</Button>
        </div>
      </div>
    );
  }
};

export default Product;
