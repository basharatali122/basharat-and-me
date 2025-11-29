import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const BusinessPlan = () => {
  const levels = [
    { rank: "Rank 1", members: "00", title: "Supervisor" },
    { rank: "Rank 2", members: "10", title: "Assistant Manager" },
    { rank: "Rank 3", members: "15", title: "Manager" },
    { rank: "Rank 4", members: "20", title: "Senior Manager" },
    { rank: "Rank 5", members: "30", title: "Executive Manager" },
  ];

  const rankingBonuses = [
    { position: "Assistant Manager", directBonus: "45%", passiveIncome: "2%" },
    { position: "Manager", directBonus: "50%", passiveIncome: "4%" },
    { position: "Senior Manager", directBonus: "55%", passiveIncome: "5%" },
  ];

  const packages = [
    { amount: "5000", bonus: "1500" },
    { amount: "10000", bonus: "3000" },
    { amount: "15000", bonus: "6000" },
  ];

  const features = [
    {
      title: "Multiple Income Channels",
      description: "Earn through direct sales, team building, and passive income streams",
      icon: "💰"
    },
    {
      title: "Training & Support",
      description: "Comprehensive training programs for both online and in-person sessions",
      icon: "🎓"
    },
    {
      title: "Unique Generation Plan",
      description: "Innovative compensation plan that rewards both performance and leadership",
      icon: "🚀"
    },
    {
      title: "Financial Freedom",
      description: "Build a sustainable business that provides long-term financial security",
      icon: "🕊️"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Business <span className="text-blue-600">Plan</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join Mountain Dweller and build your path to financial freedom with our proven direct sales model
        </p>
      </motion.div>

      <SectionDivider label="Our Vision" />

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg">
          <p className="text-lg text-gray-700 leading-relaxed text-center italic">
            "I am deeply grateful to Allah Almighty who gave me the courage to dream and the determination to turn that dream into reality. Every person has dreams in life, and when one pursues those dreams with pure intentions and strong will, success becomes inevitable with the help of Allah."
          </p>
        </div>
      </motion.div>

      <SectionDivider label="Career Levels" />

      {/* Levels Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <motion.div
              key={level.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-l-4 border-blue-500"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{level.rank}</h3>
                <div className="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 mb-4">
                  <span className="text-sm font-semibold">Members Required</span>
                  <div className="text-2xl font-bold">{level.members}</div>
                </div>
                <h4 className="text-xl font-semibold text-gray-700">{level.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Ranking & Bonuses" />

      {/* Ranking Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-4 bg-gray-900 text-white font-semibold">
            <div className="p-4 text-center">Position</div>
            <div className="p-4 text-center">Direct Bonus</div>
            <div className="p-4 text-center">Passive Income</div>
            <div className="p-4 text-center">Total Potential</div>
          </div>
          {rankingBonuses.map((rank, index) => (
            <motion.div
              key={rank.position}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-4 border-b border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <div className="p-4 text-center font-medium text-gray-800">{rank.position}</div>
              <div className="p-4 text-center text-green-600 font-bold">{rank.directBonus}</div>
              <div className="p-4 text-center text-purple-600 font-bold">{rank.passiveIncome}</div>
              <div className="p-4 text-center text-blue-600 font-bold">
                {parseInt(rank.directBonus) + parseInt(rank.passiveIncome)}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Investment Packages" />

      {/* Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.amount}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl text-white text-center overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Package</h3>
                <div className="text-4xl font-extrabold mb-2">Rs. {pkg.amount}</div>
                <div className="text-2xl font-semibold text-yellow-300 mb-6">
                  Bonus: Rs. {pkg.bonus}
                </div>
                <div className="text-lg opacity-90">
                  {((parseInt(pkg.bonus) / parseInt(pkg.amount)) * 100).toFixed(0)}% Return
                </div>
              </div>
              <div className="bg-blue-700 p-4">
                <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors w-full">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Why Choose Our Plan" />

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Start Your Journey" />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful partners who have achieved financial freedom with Mountain Dweller
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Start Your Business Today
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessPlan;    