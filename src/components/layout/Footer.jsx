import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { themeConfig } = useTheme();

  const businessLinks = [
    { name: "About Us", href: "/about" },
    { name: "Business Plan", href: "/business" },
    { name: "Ranking System", href: "/ranking" },
    { name: "Products", href: "/products" },
    { name: "Join Our Team", href: "/register" },
    { name: "Contact", href: "/contact" },
  ];

  const productCategories = [
    { name: "Hair Care", href: "/products?category=hair" },
    { name: "Skin Care", href: "/products?category=skin" },
    { name: "Face Care", href: "/products?category=face" },
    { name: "Beauty Products", href: "/products?category=beauty" },
  ];

  const supportLinks = [
    { name: "Training Program", href: "/training" },
    { name: "Business Support", href: "/support" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialIcons = [
    {
      name: "Facebook",
      href: "https://facebook.com/mountaindweller",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/mountaindweller",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
          />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/923064121334",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.55-3.7 8.25-8.25 8.25c-1.43 0-2.8-.36-4.04-1.05l-.3-.15l-3.12.82l.83-3.04l-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18c.21-.58.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.12-.12.27-.32.37-.48c.13-.18.17-.3.25-.5c.08-.2.04-.37-.02-.52c-.06-.15-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/mountaindweller",
      svg: (
        <svg
          className="size-6 transition-transform duration-200 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
          />
        </svg>
      ),
    },
  ];

  const contactInfo = [
    { 
      icon: "📧", 
      text: "info@mountaindweller.com",
      href: "mailto:info@mountaindweller.com" 
    },
    { 
      icon: "📞", 
      text: "+92 306 4121334",
      href: "tel:+923064121334" 
    },
    { 
      icon: "📍", 
      text: "Kasur, Pakistan",
      href: "https://www.google.com/maps/place/Kasur/@31.120192,74.4465699,13z/data=!3m1!4b1!4m6!3m5!1s0x3919b97b6553a0cd:0x9306801f64aa8ed2!8m2!3d31.1217131!4d74.4520445!16zL20vMDNfN19u?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D", 
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        backgroundColor: themeConfig.cardBackground,
        borderTop: `1px solid ${themeConfig.border}`,
      }}
      className="py-12 mt-20"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: themeConfig.textPrimary }}>
                  Mountain Dweller
                </h3>
                <p className="text-sm" style={{ color: themeConfig.textSecondary }}>
                  Direct Sales Company
                </p>
              </div>
            </div>
            <p className="text-sm mb-4" style={{ color: themeConfig.textSecondary }}>
              Empowering individuals to achieve financial freedom through quality products and proven business opportunities.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-2 text-sm transition-colors duration-300 hover:text-blue-500"
                  style={{ color: themeConfig.textSecondary }}
                  whileHover={{ x: 5 }}
                >
                  <span>{contact.icon}</span>
                  <span>{contact.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Business Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-lg" style={{ color: themeConfig.textPrimary }}>
              Business
            </h4>
            <ul className="space-y-3">
              {businessLinks.map((link, i) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors duration-300 hover:text-blue-500"
                    style={{ color: themeConfig.textSecondary }}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4 text-lg" style={{ color: themeConfig.textPrimary }}>
              Products
            </h4>
            <ul className="space-y-3">
              {productCategories.map((category, i) => (
                <motion.li key={category.name} whileHover={{ x: 5 }}>
                  <Link
                    to={category.href}
                    className="text-sm transition-colors duration-300 hover:text-blue-500"
                    style={{ color: themeConfig.textSecondary }}
                  >
                    {category.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4 text-lg" style={{ color: themeConfig.textPrimary }}>
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, i) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors duration-300 hover:text-blue-500"
                    style={{ color: themeConfig.textSecondary }}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="w-full mb-8"
          style={{ borderTop: `1px solid ${themeConfig.border}` }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-center md:text-left"
            style={{ color: themeConfig.textSecondary }}
          >
            © {new Date().getFullYear()} Mountain Dweller. All rights reserved. 
            <span className="block md:inline md:ml-2">Launch Date: 4th MAY 2025</span>
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-6"
          >
            {socialIcons.map((icon, i) => (
              <motion.a
                key={icon.name}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.name}
                className="group transition-all duration-300 hover:scale-110"
                style={{ color: themeConfig.textSecondary }}
                whileHover={{ 
                  scale: 1.2,
                  color: icon.name === 'WhatsApp' ? '#25D366' : 
                         icon.name === 'Facebook' ? '#1877F2' :
                         icon.name === 'Instagram' ? '#E4405F' : '#FF0000'
                }}
              >
                {icon.svg}
              </motion.a>
            ))}
          </motion.div>

          {/* Quick Action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center md:text-right"
          >
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl"
            >
              Join Now
            </Link>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-8 pt-6 border-t"
          style={{ borderColor: themeConfig.border }}
        >
          <p className="text-xs italic" style={{ color: themeConfig.textSecondary }}>
            "Helping people grow their businesses and achieve financial freedom since 2025"
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
