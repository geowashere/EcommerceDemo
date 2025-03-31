"use client";

import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import {
  getCartItemsAsync,
  removeCartItemFromCartAsync,
} from "../api/cartItemService";
import { useAuth } from "../context/authContext";
import { CartItemType } from "../utils/types";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { cartId } = useAuth();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const subtotal = 0;
  const totalItems = cartItems.length;

  useEffect(() => {
    const getCartItems = async () => {
      if (cartId) {
        const res = await getCartItemsAsync(cartId);
        console.log("cart items: ", res);
        setCartItems(res.data);
      }
    };
    getCartItems();
  }, []);

  const handleRemoveCartItem = async (cartItemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    await removeCartItemFromCartAsync(cartItemId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Your Shopping Cart
      </Typography>

      {totalItems === 0 ? (
        <Box textAlign="center" py={10}>
          <ShoppingCartIcon
            sx={{ fontSize: 80, color: "action.disabled", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start shopping to add items to your cart
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/products"
            size="large"
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              flex: 2,
              width: "100%",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              {totalItems} {totalItems === 1 ? "Item" : "Items"} in Cart
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ minHeight: 200 }}>
              {cartItems.length > 0 ? (
                <Stack spacing={2}>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={(id, newQuantity) => {
                        // Implement your quantity update logic here
                        setCartItems((prev) =>
                          prev.map((item) =>
                            item.id === id
                              ? { ...item, quantity: newQuantity }
                              : item
                          )
                        );
                      }}
                      onRemove={(id) => handleRemoveCartItem(id)}
                    />
                  ))}
                </Stack>
              ) : null}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              flex: 1,
              width: "100%",
              position: { md: "sticky" },
              top: 16,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            <Stack spacing={1} mb={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Subtotal ({totalItems} items)</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Shipping</Typography>
                <Typography>Calculated at checkout</Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Estimated Total
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ${subtotal.toFixed(2)}
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={totalItems === 0}
              >
                Proceed to Checkout
              </Button>

              <Button fullWidth variant="outlined" href="/products">
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
