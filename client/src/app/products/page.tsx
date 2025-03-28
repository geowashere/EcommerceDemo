"use client";

import Product from "../components/Product";
import { useEffect, useState } from "react";
import {
  getAllProductsAsync,
  Product as ProductType,
} from "../api/productService";
import {
  getCategoriesAsync,
  Category as CategoryType,
} from "../api/categoryService";
import Category from "../components/Category";

export default function ProductsPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  console.log("products: ", products);
  console.log("categories: ", categories);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getCategoriesAsync();
        console.log("data: ", data);
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    const getProducts = async () => {
      try {
        const data = await getAllProductsAsync();
        console.log("data: ", data);
        setProducts(data);
        setFilteredProducts(products);
      } catch (err) {
        console.error(err);
      }
    };

    getCategories();
    getProducts();
  }, []);

  const filterProductsByCategory = (
    categoryId: number,
    categoryName: string
  ) => {
    if ((categoryName = "All")) {
      setFilteredProducts(products);
    }

    const filtered = products.filter(
      (product) => product.categoryId === categoryId
    );
    setFilteredProducts(filtered);
    setSelectedCategory(categoryId);
  };

  const displayProducts =
    selectedCategory !== null && filteredProducts.length
      ? filteredProducts.map((product) => {
          return <Product key={product.id} product={product} />;
        })
      : products.map((product) => {
          return <Product key={product.id} product={product} />;
        });

  const displayCategories =
    categories.length &&
    categories.map((category) => {
      return (
        <Category
          key={category.id}
          category={category}
          onFilterProductsByCategory={filterProductsByCategory}
        />
      );
    });

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center">
        Explore Different Categories
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-5 p-8">
        {displayCategories}
      </div>
      <div className="flex flex-col items-center justify-center gap-5 p-8">
        {displayProducts}
      </div>
    </div>
  );
}
