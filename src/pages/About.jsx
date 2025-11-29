"use client";

import React from "react";
import { motion } from "framer-motion";

// SectionDivider with optional label in the center
const SectionDivider = ({ label, color, thickness = 1 }) => {
  const lineStyle = {
    borderTopWidth: `${thickness}px`,
    borderColor: color || "#13131d",
  };

  return (
    <div className="flex items-center w-full my-16">
      <div className="flex-grow border-t border-solid" style={lineStyle}></div>
      {label && (
        <span className="flex items-center px-4 text-sm text-zinc-500 font-medium">
          {label}
        </span>
      )}
      <div className="flex-grow border-t border-solid" style={lineStyle}></div>
    </div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          About <span className="text-gray-800">Mountain Dweller</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          A Pakistani direct sales company empowering individuals to achieve financial freedom through business growth and quality products.
        </p>
      </motion.div>

      <SectionDivider label="Our Vision" />

      {/* Our Vision */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row gap-10 items-center mb-20"
      >
        <div className="md:w-1/2 text-left">
          <p className="text-gray-600 leading-relaxed mb-4">
            I am deeply grateful to Allah Almighty who gave me the courage to dream and the determination to turn that dream into reality. Every person has dreams in life, and when one pursues those dreams with pure intentions and strong will, success becomes inevitable with the help of Allah.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            I am proud to lead a team of talented and dedicated individuals who share this vision and work tirelessly to deliver exceptional results. Their efforts and commitment have helped us achieve remarkable milestones.
          </p>
          <p className="text-gray-600 leading-relaxed">
            I warmly invite you to be a part of this journey - join us and experience the transformation that success, vision, and unity can bring into your life.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Mountain Dweller Team"
          className="rounded-2xl shadow-lg w-full md:w-1/2"
        />
      </motion.div>

      <SectionDivider label="About Our Company" />

      {/* About Our Company */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 leading-relaxed mb-6">
            Mountain Dweller is a Pakistani direct sales company, launched on <strong>4th MAY 2025</strong>. The company's mission is to help people grow their businesses and achieve financial freedom.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Business Plan</h3>
              <p className="text-gray-600">
                Our business plan provides members with guaranteed income through multiple channels - a perfect opportunity for dreamers and doers alike.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Training & Support</h3>
              <p className="text-gray-600">
                We offer training and support programs to help members succeed both online and in-person sessions are available.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <SectionDivider label="Our Products" />

      {/* Our Products */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "SHAMPOO - Shenmoo",
              features: ["Anti hair fall", "Natural & Herbal", "Strengthens Hair", "Shine & Smoothness"],
              image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "SUN BLOCK",
              features: ["SPF 50 Protection", "Shield Against UVB & UVA", "Brightens Skin Tone"],
              image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "FACE CARE RANGE",
              features: ["Face Wash", "Serum", "Cream", "For all Skin Types"],
              image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
          ].map((product, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{product.title}</h3>
                <ul className="text-gray-600 space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Business Opportunity" />

      {/* Business Opportunity */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-3 gap-8 text-center mb-20"
      >
        {[
          { value: "Multiple Income", label: "Channels" },
          { value: "Training &", label: "Support Programs" },
          { value: "Unique Generation", label: "Plan" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-3xl font-extrabold text-blue-600 mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <SectionDivider label="Join Our Journey" />

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl p-10 text-center shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Join the Mountain Dweller Family</h2>
        <p className="mb-6 text-lg">
          Discover amazing business opportunities, quality products, and a supportive community designed for your success.
        </p>
        <a
          href="/contact"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Start Your Journey
        </a>
      </motion.div>

    </div>
  );
};

export default About;