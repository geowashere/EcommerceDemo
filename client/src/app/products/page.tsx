"use client";
import { useState, useEffect, useCallback } from "react";
import {
  IconButton,
  Typography,
  CircularProgress,
  Tooltip,
  Chip,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ProductCardAdmin from "../components/ProductCardAdmin";
import CategoryCardAdmin from "../components/CategoryCardAdmin";
import { getCategoriesAsync } from "../api/categoryService";
import { getAllProductsAsync } from "../api/productService";
import { CategoryType, ProductType } from "../utils/types";

const AdminPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const moveCategory = useCallback((dragIndex: number, hoverIndex: number) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories];
      const [removed] = updatedCategories.splice(dragIndex, 1);
      updatedCategories.splice(hoverIndex, 0, removed);
      return updatedCategories;
    });
  }, []);

  const handleDrop = useCallback(async () => {
    try {
      const categoryOrder = categories.map((cat, index) => ({
        id: cat.id,
        position: index + 1,
      }));

      console.log("updating order");
      // await updateCategoryOrder(categoryOrder);
    } catch (error) {
      console.error("Failed to update category order:", error);
    }
  }, [categories]);

  const handleEdit = (id: number, type: "category" | "product") => {
    console.log(`Edit ${type} with id:`, id);
  };

  const handleDelete = (id: number, type: "category" | "product") => {
    console.log(`Delete ${type} with id:`, id);
  };

  const handleAdd = (type: "category" | "product") => {
    console.log(`Add new ${type}`);
  };

  const handleDrag = (id: number, type: "category" | "product") => {
    console.log(`Drag ${type} with id:`, id);
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
        Admin Dashboard
      </Typography>

      {/* Categories Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-semibold text-gray-700">
            Categories
          </Typography>
          <Tooltip title="Add Category">
            <IconButton
              onClick={() => handleAdd("category")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <Chip
            label="All"
            onClick={() => filterProductsByCategory(0, "All")}
            color={selectedCategory === null ? "primary" : "default"}
            className="cursor-pointer hover:shadow-md transition-all h-full"
          />
          {categories.map((category, index) => (
            <CategoryCardAdmin
              key={category.id}
              category={category}
              index={index}
              isSelected={selectedCategory === category.id}
              onFilter={filterProductsByCategory}
              onEdit={(id) => handleEdit(id, "category")}
              onDelete={(id) => handleDelete(id, "category")}
              moveCategory={moveCategory}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" className="font-semibold text-gray-700">
            Products
          </Typography>
          <Tooltip title="Add Product">
            <IconButton
              onClick={() => handleAdd("product")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(selectedCategory !== null ? filteredProducts : products).map(
            (product) => (
              <ProductCardAdmin
                key={product.id}
                product={product}
                onEdit={(id) => handleEdit(id, "product")}
                onDelete={(id) => handleDelete(id, "product")}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
