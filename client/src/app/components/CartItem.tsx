"use client";

import {
  Box,
  Typography,
  Divider,
  IconButton,
  Stack,
  TextField,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { CartItemType } from "../utils/types";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h3">
              {item.productName}
            </Typography>
            <IconButton
              aria-label="remove"
              onClick={() => onRemove(item.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.productCategory}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {item.productDescription}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <TextField
              size="small"
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              sx={{ width: 80 }}
            />

            <Typography variant="h6">
              ${(item.productPrice * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Paper>
  );
};

export default CartItem;
