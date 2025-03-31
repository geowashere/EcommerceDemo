import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Select,
} from "@mui/material";
import { CategoryType, ProductType } from "../utils/types";
import { updateProductAsync } from "../api/productService";

interface UpdateProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  categories: CategoryType[];
  product?: ProductType;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  open,
  onClose,
  onSubmit,
  categories,
  product,
}) => {
  const [name, setName] = useState(product?.name);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState<number | "">(product?.price || "");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    product?.categoryId || null
  );

  console.log("product: ", product);

  const handleSubmit = () => {
    if (name)
      if (!name.trim() || price === "" || selectedCategory === 0) return;

    console.log("submitting new product: ");
    console.log("name: ", name);
    console.log("description: ", description);
    console.log("price: ", price);
    console.log("selectedCategory: ", selectedCategory);

    const categoryId = Number(selectedCategory);

    if (product && name && description && price && selectedCategory)
      updateProductAsync({
        id: product.id,
        name,
        description,
        price,
        categoryId: selectedCategory,
      });

    setName("");
    setDescription("");
    setPrice("");
    setSelectedCategory(null);

    onClose();
    onSubmit();
  };

  if (name && description) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        closeAfterTransition={false}
      >
        <DialogTitle className="bg-gray-50 p-6">
          <p className="text-xl font-semibold text-gray-800">
            Update Product Details
          </p>
        </DialogTitle>

        <DialogContent className="p-6 flex flex-col gap-5">
          <TextField
            fullWidth
            label="Product Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
            required
          />

          <Select
            fullWidth
            label="Category"
            variant="filled"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="mb-4"
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            label="Price"
            variant="filled"
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              inputProps: { min: 0, step: 0.01 },
            }}
            className="mb-4"
            required
          />

          <TextField
            fullWidth
            label="Description"
            variant="filled"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions className="bg-gray-50 px-6 py-4">
          <Button
            onClick={onClose}
            className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !name.trim() ||
              price === 0 ||
              !selectedCategory ||
              !description.trim()
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            variant="contained"
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default UpdateProductModal;
