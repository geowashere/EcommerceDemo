import { Category as CategoryType } from "../api/categoryService";

interface CategoryProps {
  category: CategoryType;
  onFilterProductsByCategory: (
    categoryId: number,
    categoryName: string
  ) => void;
}

const Category: React.FC<CategoryProps> = ({
  category,
  onFilterProductsByCategory,
}) => {
  if (category) {
    return (
      <div
        className="bg-[#ccc] p-6 rounded-lg shadow-lg cursor-pointer"
        onClick={() => onFilterProductsByCategory(category.id, category.name)}
      >
        <h3 className="text-xl font-semibold  mb-2">{category.name}</h3>
        <p className="">{category.description}</p>
      </div>
    );
  }
};

export default Category;
