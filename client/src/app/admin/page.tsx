"use client";

import { useState, useEffect, useCallback } from "react";
import update from "immutability-helper";
import {
  IconButton,
  Chip,
  CircularProgress,
  Tooltip,
  Typography,
  Alert,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getCategoriesAsync,
  updateCategoryByIdAsync,
  updateCategoryOrderAsync,
} from "../api/categoryService";
import {
  createProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  updateProductAsync,
  updateProductOrderAsync,
} from "../api/productService";
import CategoryCardAdmin from "../components/CategoryCardAdmin";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { CategoryType, ProductType } from "../utils/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateCategoryModal from "../components/CreateCategoryModal";
import CreateProductModal from "../components/CreateProductModal";
import UpdateProductModal from "../components/UpdateProductModal";
import UpdateCategoryModal from "../components/UpdateCategoryModal";

const AdminPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [catError, setCatError] = useState<string | null>(null);
  const [prodError, setProdError] = useState<string | null>(null);

  // Modals - Modals Info
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false);
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] =
    useState<boolean>(false);
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState<boolean>(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState<boolean>(false);

  const [productToUpdate, setProductToUpdate] = useState<ProductType>();
  const [cateogryToUpdate, setCateogryToUpdate] = useState<CategoryType>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesData, productsData] = await Promise.all([
        getCategoriesAsync(),
        getAllProductsAsync(),
      ]);

      setCategories(categoriesData);
      setProducts(productsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const moveCategory = useCallback((dragIndex: number, hoverIndex: number) => {
    setCategories((prevCategories: CategoryType[]) =>
      update(prevCategories, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCategories[dragIndex] as CategoryType],
        ],
      })
    );
  }, []);

  const handleDropCategory = useCallback(async () => {
    try {
      const updated = categories.map((cat, index) => ({
        id: cat.id,
        position: index + 1,
      }));
      console.log("updating db");
      const res = await updateCategoryOrderAsync(updated);
      console.log("update db res: ", res);
    } catch (error) {
      console.error("Failed to update category order:", error);
    }
  }, [categories]);

  const moveProduct = useCallback((dragIndex: number, hoverIndex: number) => {
    setProducts((prevProducts: ProductType[]) =>
      update(prevProducts, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevProducts[dragIndex] as ProductType],
        ],
      })
    );
  }, []);

  const handleDropProduct = useCallback(async () => {
    try {
      const updated = products.map((prod, index) => ({
        id: prod.id,
        position: index + 1,
      }));

      console.log("updated: ", updated);

      const res = await updateProductOrderAsync(updated);
      console.log("updated prod res: ", res);
    } catch (error) {
      console.error("Failed to update product order:", error);
    }
  }, [products]);

  const handleDeleteCategory = async (id: number) => {
    try {
      setCatError(null);
      await deleteCategoryAsync(id);
      await fetchData();
    } catch (err: any) {
      setCatError(err?.response?.data?.message);
      setTimeout(() => {
        setCatError(null);
      }, 2500);
    }
    console.log("Cat deleted");
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      setProdError(null);
      await deleteProductAsync(id);
      await fetchData();
    } catch (err: any) {
      setProdError(err?.response?.data?.message || "ERROR");
      setTimeout(() => {
        setProdError(null);
      }, 2500);
    }
    console.log("prod deleted");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <div className="container mx-auto px-4 py-8">
          <Typography variant="h4" className="mb-6 font-bold text-gray-800">
            Admin Dashboard
          </Typography>

          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-5">
                <Typography
                  variant="h5"
                  className="font-semibold text-gray-700"
                >
                  Categories
                </Typography>

                <Chip
                  label="All"
                  color={selectedCategory === null ? "primary" : "default"}
                  className="cursor-pointer hover:shadow-md transition-shadow h-full"
                />
              </div>
              <Tooltip title="Add Category">
                <IconButton
                  onClick={() => setIsCreateCategoryModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              {categories
                .filter((category) => category.name !== "All")
                .map((category, index) => (
                  <CategoryCardAdmin
                    key={category.id}
                    category={category}
                    index={index}
                    onEdit={() => {
                      setIsUpdateCategoryModalOpen(true);
                      setCateogryToUpdate(category);
                    }}
                    isSelected={selectedCategory === category.id}
                    onDelete={() => handleDeleteCategory(category.id)}
                    moveCategory={moveCategory}
                    onDrop={handleDropCategory}
                  />
                ))}
            </div>
          </section>
          <section>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" className="font-semibold text-gray-700">
                Products
              </Typography>
              <Tooltip title="Add Product">
                <IconButton
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => setIsCreateProductModalOpen(true)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-6">
              {products.map((product, index) => (
                <ProductCardAdmin
                  key={product.id}
                  index={index}
                  product={product}
                  onEdit={() => {
                    setIsUpdateProductModalOpen(true);
                    setProductToUpdate(product);
                  }}
                  onDelete={() => handleDeleteProduct(product.id)}
                  moveProduct={moveProduct}
                  onDrop={handleDropProduct}
                />
              ))}
            </div>
          </section>
        </div>
        {isCreateCategoryModalOpen && (
          <CreateCategoryModal
            open={isCreateCategoryModalOpen}
            onClose={() => setIsCreateCategoryModalOpen(false)}
            onSubmit={async (categoryData) => {
              await createCategoryAsync(categoryData);
              await fetchData();
            }}
          />
        )}
        {isCreateProductModalOpen && (
          <CreateProductModal
            open={isCreateProductModalOpen}
            onClose={() => setIsCreateProductModalOpen(false)}
            onSubmit={async (productData) => {
              await createProductAsync(productData);
              await fetchData();
            }}
            categories={categories}
          />
        )}
        {isUpdateCategoryModalOpen && (
          <UpdateCategoryModal
            open={isUpdateCategoryModalOpen}
            onClose={() => setIsUpdateCategoryModalOpen(false)}
            onSubmit={async (categoryData) => {
              await updateCategoryByIdAsync(categoryData);
              await fetchData();
            }}
            category={cateogryToUpdate}
          />
        )}
        {isUpdateProductModalOpen && (
          <UpdateProductModal
            open={isUpdateProductModalOpen}
            onClose={() => setIsUpdateProductModalOpen(false)}
            onSubmit={async (productData) => {
              await updateProductAsync(productData);
              await fetchData();
            }}
            categories={categories}
            product={productToUpdate}
          />
        )}
        <div className="fixed top-0 left-0 right-0 items-center justify-center z-50 w-full p-4">
          {prodError && (
            <Alert severity="error" className="mb-4">
              {prodError}
            </Alert>
          )}
          {catError && (
            <Alert severity="error" className="mb-4">
              {catError}
            </Alert>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default AdminPage;
