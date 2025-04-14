import { Category } from "../../models/Category/categoryModel";

export const getCategories = () => Category.find();
export const getCategoryById = (id: string) => Category.findById(id);
export const getCategoryByCategoryId = (categoryId: string) => Category.findOne({ categoryId: categoryId });
export const getCategoryByName = (name: string) => Category.findOne({ name });
export const createCategory = (values: Record<string, any>) => new Category(values).save().then((category) => category.toObject());
export const deleteCategory = (categoryId: string) => Category.findOneAndDelete({ categoryId: categoryId });