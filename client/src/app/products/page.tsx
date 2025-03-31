"use client";
import { useState, useEffect } from "react";
import { Typography, CircularProgress, Chip } from "@mui/material";
import { getCategoriesAsync } from "../api/categoryService";
import { getAllProductsAsync } from "../api/productService";
import { CategoryType, ProductType } from "../utils/types";
import ProductCardUser from "../components/ProductCardUser";
import CategoryCardUser from "../components/CategoryCardUser";
import { useAuth } from "../context/authContext";
import LoginPromptModal from "../components/LoginPromptModal";
import { useRouter } from "next/navigation";
import AddToCartModal from "../components/AddToCartModal";
import { addCartItemToCart } from "../api/cartItemService";

const ProductsPage = () => {
  const { token, cartId } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal info
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openAddToCartModal, setOpenAddToCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          getCategoriesAsync(),
          getAllProductsAsync(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product?: ProductType) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setSelectedProduct(product);
    setOpenAddToCartModal(true);
  };

  const handleSubmitAddToCart = async (quantity: number) => {
    //cartid, productid, quantity
    if (selectedProduct && cartId) {
      console.log("selectedProduct: ", selectedProduct);
      console.log("cartId: ", cartId);
      console.log("quantity: ", quantity);

      await addCartItemToCart({
        cartId,
        productId: selectedProduct.id,
        quantity,
      });

      setOpenAddToCartModal(false);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    router.push("/login");
  };

  const filterProductsByCategory = (
    categoryId: number,
    categoryName: string
  ) => {
    if (categoryName === "All") {
      setFilteredProducts(products);
      setSelectedCategory(null);
      return;
    }

    const filtered = products.filter(
      (product) => product.categoryId === categoryId
    );
    setFilteredProducts(filtered);
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-6 font-bold text-gray-800">
        Explore Our Products
      </Typography>

      {/* Categories Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-semibold text-gray-700">
            Categories
          </Typography>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <Chip
            label="All"
            onClick={() => filterProductsByCategory(0, "All")}
            color={selectedCategory === null ? "primary" : "default"}
            className="cursor-pointer hover:shadow-md transition-all h-full w-fit"
          />
          <div className="flex flex-wrap gap-5">
            {categories.map((category) => (
              <CategoryCardUser
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={() =>
                  filterProductsByCategory(category.id, category.name)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-semibold mb-4 text-gray-700">
            Products
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(selectedCategory !== null ? filteredProducts : products).map(
            (product) => (
              <ProductCardUser
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            )
          )}
        </div>
      </section>
      <LoginPromptModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      {openAddToCartModal && (
        <AddToCartModal
          open={openAddToCartModal}
          onClose={() => setOpenAddToCartModal(false)}
          onConfirm={handleSubmitAddToCart}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
