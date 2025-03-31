import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import { ProductType } from "../utils/types";

interface AddToCartModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  selectedProduct?: ProductType;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  open,
  onClose,
  onConfirm,
  selectedProduct,
}) => {
  console.log("IN ADDTOCART: ", selectedProduct);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice =
    selectedProduct && (selectedProduct.price * quantity).toFixed(2);

  if (selectedProduct) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-gray-50 p-4">
          <p className="font-semibold">Add to Cart</p>
        </DialogTitle>

        <DialogContent className="p-4">
          <div className="mb-4">
            <Typography variant="body1" className="font-medium">
              {selectedProduct.name}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              ${selectedProduct.price.toFixed(2)} each
            </Typography>
          </div>

          <Divider className="my-3" />

          <div className="flex items-center justify-between mb-4">
            <Typography variant="body1" className="font-medium">
              Quantity
            </Typography>
            <div className="flex items-center space-x-2">
              <IconButton
                onClick={handleDecrease}
                className="border border-gray-300 rounded-md"
                size="small"
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography variant="body1" className="w-8 text-center">
                {quantity}
              </Typography>
              <IconButton
                onClick={handleIncrease}
                className="border border-gray-300 rounded-md"
                size="small"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </div>
          </div>

          <Divider className="my-3" />

          <div className="flex justify-between items-center mt-4">
            <Typography variant="body1" className="font-medium">
              Total
            </Typography>
            <Typography variant="h6" className="font-bold">
              ${totalPrice}
            </Typography>
          </div>
        </DialogContent>

        <DialogActions className="p-4">
          <Button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(quantity)}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default AddToCartModal;
