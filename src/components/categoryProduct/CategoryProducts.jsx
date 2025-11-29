// src/components/categoryProduct/CategoryProducts.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/axiosInstance";
import { FolderOpen, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const placeholderImg = "https://picsum.photos/400/300";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const { addToCart } = useContext(GlobalContext);
  const { themeConfig } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  // Fetch all products and filter by categoryId
  useEffect(() => {
    const fetchProductsAndCategory = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const res = await axiosInstance.get("/product");
        const allProducts = res.data.products || res.data;
        const filtered = allProducts.filter(
          (p) => String(p.categoryId) === String(categoryId)
        );
        setProducts(filtered);

        // Fetch category name
        try {
          const categoryRes = await axiosInstance.get("/category");
          const categories = categoryRes.data.categories || categoryRes.data;
          const currentCategory = categories.find(
            (cat) => String(cat.categoryId) === String(categoryId)
          );
          setCategoryName(currentCategory?.name || "This Category");
        } catch (err) {
          console.error("Error fetching category name:", err);
          setCategoryName("This Category");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsAndCategory();
    }
  }, [categoryId]);

  const handleAddToCart = (product) => {
    const image =
      product.images?.length > 0
        ? product.images[0].data
        : `${placeholderImg}?random=${product.productId}`;

    addToCart({
      id: product.productId,
      name: product.name,
      price: product.price,
      image,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{backgroundColor: themeConfig.background}}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!products.length) {
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
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            No Products Found
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            {categoryName} doesn't have any products yet. 
            Check back later or explore other categories for amazing products.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <FolderOpen className="w-5 h-5" />
              Browse Categories
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
      className="container mx-auto px-4 py-10 min-h-screen"
      style={{backgroundColor: themeConfig.background}}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Products in {categoryName}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {products.length} product{products.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const image =
            product.images?.length > 0
              ? product.images[0].data
              : `${placeholderImg}?random=${product.productId}`;

          return (
            <motion.div
              key={product.productId}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col bg-white dark:bg-gray-800 dark:border-gray-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <Link
                  to={`/product/${product.productId}`}
                  className="text-lg font-semibold hover:text-blue-600 mb-2 text-gray-800 dark:text-white dark:hover:text-blue-400"
                >
                  {product.name}
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  ${product.price ?? "N/A"}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Back to Categories */}
      <div className="text-center mt-12">
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          Back to Categories
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryProducts;