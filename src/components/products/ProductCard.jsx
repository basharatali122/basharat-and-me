import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartPlus,
  faStar,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import { formatCurrency } from "../../utils/format";
import { motion, AnimatePresence } from "framer-motion";

const StarRating = ({ rating = 5, size = "sm" }) => {
  const safeRating = Math.min(Math.max(Number(rating) || 0, 0), 5);
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;

  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`${sizes[size]} text-yellow-400`}
            />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <div key={index} className="relative">
              <FontAwesomeIcon
                icon={faStar}
                className={`${sizes[size]} text-gray-200`}
              />
              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <FontAwesomeIcon
                  icon={faStar}
                  className={`${sizes[size]} text-yellow-400`}
                />
              </div>
            </div>
          );
        } else {
          return (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`${sizes[size]} text-gray-200`}
            />
          );
        }
      })}
      <span className="ml-1 text-gray-500 text-sm">{safeRating.toFixed(1)}</span>
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const liked = isInWishlist(product.productId);
  const discounted = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = discounted
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getImageSrc = (img, fallbackSeed) => {
    if (img?.data) return img.data;
    return `https://picsum.photos/600/600?random=${fallbackSeed}`;
  };

  const images = product.images?.length
    ? product.images.map((img, i) => getImageSrc(img, `${product.productId}-${i}`))
    : [getImageSrc(null, product.productId || index)];

  const image = images[currentImage] || images[0];

  const handleWishlistClick = () => toggleWishlist(product);
  const handleAddToCart = () => addToCart(product, 1);

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -2 }}
        className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-lg"
      >
        {/* Discount Badge */}
        {discounted && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full z-10 transition hover:scale-110"
          aria-label="Toggle wishlist"
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={liked ? "text-red-500" : "text-gray-400"}
          />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition ${
                    i === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
            {product.name}
          </h3>

          <StarRating rating={product.rating} />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {discounted && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              product.stock > 0 
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-3 rounded-lg transition ${
                product.stock === 0 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-blue-700"
              }`}
            >
              <FontAwesomeIcon icon={faCartPlus} size="sm" />
              <span className="text-sm">Add</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <span className="text-sm">View</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setQuickViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setQuickViewOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Image Carousel */}
                <div className="relative">
                  <img
                    src={images[currentImage]}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                      </button>
                      <button
                        onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faChevronRight} size="sm" />
                      </button>
                    </>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h2>
                    <StarRating rating={product.rating} size="md" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {product.description || "No description available."}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(product.price)}
                    </span>
                    {discounted && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      product.stock > 0 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={`flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg transition ${
                        product.stock === 0 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:bg-blue-700"
                      }`}
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                      Add to Cart
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleWishlistClick}
                      className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={liked ? "text-red-500" : "text-gray-400"}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;