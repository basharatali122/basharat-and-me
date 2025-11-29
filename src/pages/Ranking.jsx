"use client";

import React, { useState } from "react";
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

const Ranking = () => {
  const [calculatorData, setCalculatorData] = useState({
    currentMembers: 0,
    monthlySales: 0,
    selectedRank: "Assistant Manager",
    directReferrals: 0
  });

  const [calculationResult, setCalculationResult] = useState(null);

  const rankingLevels = [
    {
      rank: "Rank 1",
      title: "Supervisor",
      members: "00",
      directBonus: "40",
      passiveIncome: "1",
      requirements: "Start with any package",
      color: "from-blue-400 to-blue-500",
      badge: "🥉",
      minMembers: 0,
      maxMembers: 9
    },
    {
      rank: "Rank 2",
      title: "Assistant Manager",
      members: "10",
      directBonus: "45",
      passiveIncome: "2",
      requirements: "10 active team members",
      color: "from-green-400 to-green-500",
      badge: "🥈",
      minMembers: 10,
      maxMembers: 14
    },
    {
      rank: "Rank 3",
      title: "Manager",
      members: "15",
      directBonus: "50",
      passiveIncome: "4",
      requirements: "15 active team members",
      color: "from-purple-400 to-purple-500",
      badge: "🥇",
      minMembers: 15,
      maxMembers: 19
    },
    {
      rank: "Rank 4",
      title: "Senior Manager",
      members: "20",
      directBonus: "55",
      passiveIncome: "5",
      requirements: "20 active team members + 2 Managers",
      color: "from-orange-400 to-orange-500",
      badge: "💎",
      minMembers: 20,
      maxMembers: 29
    },
    {
      rank: "Rank 5",
      title: "Executive Manager",
      members: "30",
      directBonus: "60",
      passiveIncome: "6",
      requirements: "30 active team members + 3 Senior Managers",
      color: "from-red-400 to-red-500",
      badge: "👑",
      minMembers: 30,
      maxMembers: 1000
    }
  ];

  const bonusStructure = [
    { type: "Direct Referral Bonus", description: "Earn immediate commission on every direct sale", percentage: "Up to 60%" },
    { type: "Team Building Bonus", description: "Passive income from your team's performance", percentage: "Up to 6%" },
    { type: "Leadership Bonus", description: "Additional rewards for developing leaders", percentage: "2-5%" },
    { type: "Performance Bonus", description: "Monthly incentives for achieving targets", percentage: "Variable" }
  ];

  const successStories = [
    { name: "Ahmad R.", rank: "Senior Manager", earnings: "Rs. 150,000/month", duration: "6 months" },
    { name: "Sara Khan", rank: "Manager", earnings: "Rs. 80,000/month", duration: "4 months" },
    { name: "Bilal W.", rank: "Executive Manager", earnings: "Rs. 250,000/month", duration: "9 months" }
  ];

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEarnings = () => {
    const { currentMembers, monthlySales, selectedRank, directReferrals } = calculatorData;
    
    // Find selected rank details
    const selectedRankData = rankingLevels.find(rank => rank.title === selectedRank);
    
    if (!selectedRankData) {
      alert("Please select a valid rank");
      return;
    }

    // Calculate direct referral earnings
    const directReferralEarnings = (monthlySales * (parseInt(selectedRankData.directBonus) / 100)) * directReferrals;
    
    // Calculate team building bonus (based on team size and rank)
    const teamBuildingRate = parseInt(selectedRankData.passiveIncome) / 100;
    const teamBuildingEarnings = monthlySales * teamBuildingRate * currentMembers;
    
    // Calculate leadership bonus (additional 2% for each rank above Supervisor)
    const leadershipBonus = selectedRankData.minMembers >= 10 ? monthlySales * 0.02 * currentMembers : 0;
    
    // Performance bonus (based on achieving rank requirements)
    const performanceBonus = currentMembers >= selectedRankData.minMembers ? monthlySales * 0.05 : 0;
    
    const totalEarnings = directReferralEarnings + teamBuildingEarnings + leadershipBonus + performanceBonus;
    
    // Determine next rank
    const currentRankIndex = rankingLevels.findIndex(rank => rank.title === selectedRank);
    const nextRank = currentRankIndex < rankingLevels.length - 1 ? rankingLevels[currentRankIndex + 1] : null;
    
    setCalculationResult({
      directReferralEarnings,
      teamBuildingEarnings,
      leadershipBonus,
      performanceBonus,
      totalEarnings,
      nextRank,
      selectedRank: selectedRankData
    });
  };

  const getCurrentRank = (members) => {
    return rankingLevels.find(rank => 
      members >= rank.minMembers && members <= rank.maxMembers
    ) || rankingLevels[0];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
          Ranking <span className="text-blue-600">System</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Climb the ladder of success with our transparent and rewarding ranking system. 
          Each level brings new opportunities and higher earnings.
        </p>
      </motion.div>

      <SectionDivider label="Career Progression" />

      {/* Ranking Levels */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="space-y-8">
          {rankingLevels.map((level, index) => (
            <motion.div
              key={level.rank}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col lg:flex-row items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-l-8 ${
                index % 2 === 0 ? 'border-l-blue-500' : 'border-l-green-500'
              }`}
            >
              {/* Rank Badge */}
              <div className={`w-full lg:w-1/4 bg-gradient-to-r ${level.color} p-8 text-white text-center`}>
                <div className="text-4xl mb-2">{level.badge}</div>
                <h3 className="text-2xl font-bold mb-2">{level.rank}</h3>
                <h4 className="text-xl font-semibold">{level.title}</h4>
              </div>

              {/* Requirements */}
              <div className="w-full lg:w-1/4 p-6 text-center border-r border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Members Required</div>
                <div className="text-3xl font-bold text-gray-800">{level.members}</div>
                <div className="text-sm text-gray-600 mt-2">{level.requirements}</div>
              </div>

              {/* Earnings */}
              <div className="w-full lg:w-1/2 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Direct Bonus</div>
                    <div className="text-2xl font-bold text-green-600">{level.directBonus}%</div>
                    <div className="text-xs text-gray-500">On every sale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Passive Income</div>
                    <div className="text-2xl font-bold text-purple-600">{level.passiveIncome}%</div>
                    <div className="text-xs text-gray-500">Team performance</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-gray-500">Total Potential</div>
                  <div className="text-xl font-bold text-blue-600">
                    {parseInt(level.directBonus) + parseInt(level.passiveIncome)}% Total Earnings
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Earnings Calculator" />

      {/* Progress Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Calculate Your Potential Earnings</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Team Members</label>
              <input 
                type="number" 
                value={calculatorData.currentMembers}
                onChange={(e) => handleInputChange('currentMembers', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Sales (Rs.)</label>
              <input 
                type="number" 
                value={calculatorData.monthlySales}
                onChange={(e) => handleInputChange('monthlySales', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="0"
                min="0"
              />
            </div>
            
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Direct Referrals</label>
              <input 
                type="number" 
                value={calculatorData.directReferrals}
                onChange={(e) => handleInputChange('directReferrals', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="0"
                min="0"
                max={calculatorData.currentMembers}
              />
            </div>
            
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Current Rank</label>
              <select 
                value={calculatorData.selectedRank}
                onChange={(e) => handleInputChange('selectedRank', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              >
                {rankingLevels.map(rank => (
                  <option key={rank.title} value={rank.title}>{rank.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={calculateEarnings}
              className="bg-blue-600 text-white font-bold py-4 px-12 rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Calculate My Earnings
            </button>
          </div>

          {/* Results Display */}
          {calculationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200"
            >
              <h4 className="text-2xl font-bold text-center mb-6 text-gray-800">Your Earnings Breakdown</h4>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Direct Referral</div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(calculationResult.directReferralEarnings)}</div>
                </div>
                
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Team Building</div>
                  <div className="text-xl font-bold text-purple-600">{formatCurrency(calculationResult.teamBuildingEarnings)}</div>
                </div>
                
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Leadership Bonus</div>
                  <div className="text-xl font-bold text-orange-600">{formatCurrency(calculationResult.leadershipBonus)}</div>
                </div>
                
                <div className="text-center bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-600 mb-1">Performance Bonus</div>
                  <div className="text-xl font-bold text-red-600">{formatCurrency(calculationResult.performanceBonus)}</div>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="text-center bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white shadow-lg">
                <div className="text-sm opacity-90 mb-1">Total Monthly Earnings</div>
                <div className="text-4xl font-bold">{formatCurrency(calculationResult.totalEarnings)}</div>
                <div className="text-sm opacity-90 mt-2">at {calculationResult.selectedRank.title} Level</div>
              </div>

              {/* Next Rank Suggestion */}
              {calculationResult.nextRank && (
                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Reach <span className="font-semibold text-blue-600">{calculationResult.nextRank.title}</span> to increase your earnings potential
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    Potential at {calculationResult.nextRank.title}: {formatCurrency(calculationResult.totalEarnings * 1.3)}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      <SectionDivider label="Bonus Structure" />

      {/* Bonus Structure */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonusStructure.map((bonus, index) => (
            <motion.div
              key={bonus.type}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all border-t-4 border-blue-500"
            >
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{bonus.type}</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">{bonus.percentage}</div>
              <p className="text-gray-600 text-sm">{bonus.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Success Stories" />

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{story.name}</h3>
                <div className="text-blue-600 font-semibold mb-3">{story.rank}</div>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <div className="text-2xl font-bold text-green-600">{story.earnings}</div>
                  <div className="text-sm text-gray-500">in {story.duration}</div>
                </div>
                <div className="text-sm text-gray-600">
                  "Mountain Dweller changed my life with its transparent ranking system"
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Start Your Climb Today!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every great journey begins with a single step. Join Mountain Dweller and start your ascent to financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/business"
              className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              View Business Plan
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Join Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Ranking;