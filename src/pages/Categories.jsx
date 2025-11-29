// src/components/Categories.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FolderOpen, Plus, ShoppingBag, ArrowRight, Home, Package } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { themeConfig } = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res.data.categories || res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: themeConfig.background}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center px-4 py-10"
        style={{backgroundColor: themeConfig.background}}
      >
        <div className="text-center max-w-md mx-auto">
          {/* Icon */}
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="w-12 h-12 text-gray-400" />
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            No Categories Yet
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            It looks like no product categories have been added yet. 
            Categories help organize your products and make it easier for customers to find what they're looking for.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse All Products
            </Link>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-20 px-4 py-10 max-w-dvw min-h-screen"
      style={{backgroundColor: themeConfig.background}}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Shop by Category
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Discover our wide range of products organized by category. 
          Find exactly what you're looking for with ease.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {categories.map((category) => (
          <motion.div
            key={category.categoryId}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <Link 
              to={`/category/${category.categoryId}`}
              className="block p-6 text-center"
            >
              {/* Category Icon */}
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              {/* Category Name */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {category.name}
              </h3>
              
              {/* Category Description */}
              {category.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
              )}
              
              {/* View Products Button */}
              <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm hover:gap-3 transition-all">
                View Products
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Categories Stats */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-6 bg-white dark:bg-gray-800 rounded-xl shadow px-6 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Categories
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Ready to Explore
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Find your perfect products
            </div>
          </div>
        </div>
      </div>

      {/* Additional Navigation */}
      <div className="text-center mt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
        >
          <ShoppingBag className="w-5 h-5" />
          View All Products
        </Link>
      </div>
    </motion.div>
  );
};

export default Categories;