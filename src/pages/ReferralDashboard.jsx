import React, { useState, useEffect } from "react";
import useReferral from "../hooks/useReferral";
import useTeam from "../hooks/useTeam";
import {
  Users,
  Share2,
  Copy,
  TrendingUp,
  Network,
  ListTree,
  Table,
  PieChart,
  BarChart3,
  Crown,
  Star,
  Zap,
  Target,
  Award,
  UserCheck,
  UserPlus,
} from "lucide-react";

const ReferralDashboard = () => {
  const {
    referralInfo,
    referralAnalytics,
    loading: referralLoading,
    error: referralError,
    refreshReferralData,
  } = useReferral();

  const {
    teamData,
    loading: teamLoading,
    error: teamError,
    fetchTeamTree,
    fetchTeamList,
  } = useTeam();

  const [activeSection, setActiveSection] = useState("overview");
  const [referralView, setReferralView] = useState("grid");
  const [teamView, setTeamView] = useState("tree");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    refreshReferralData();
  }, []);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loading = referralLoading || teamLoading;
  const error = referralError || teamError;

  // Safe data access with fallbacks and fix undefined referral link
  const safeReferralInfo = referralInfo ? {
    ...referralInfo,
    referralLink: referralInfo.referralLink?.replace('undefined', window.location.origin) || `${window.location.origin}/signup?ref=${referralInfo.referralCode || ''}`,
    referralCount: referralInfo.referralCount || 0,
    referralLevel: referralInfo.referralLevel || 1,
    referralCode: referralInfo.referralCode || '',
    referrals: referralInfo.referrals || []
  } : {
    referralCount: 0,
    referralLevel: 1,
    referralLink: `${window.location.origin}/signup?ref=`,
    referralCode: '',
    referrals: []
  };

  const safeTeamData = teamData || {
    summary: {
      directReferrals: 0,
      totalTeamMembers: 0,
      teamDepth: 0,
      indirectReferrals: 0
    },
    overview: {
      directTeam: [],
      summary: {
        directReferrals: 0,
        totalTeamMembers: 0,
        teamDepth: 0,
        indirectReferrals: 0
      }
    },
    tree: {
      teamTree: {
        user: { name: "You", email: "" },
        team: []
      }
    }
  };

  if (loading && !referralInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading your referral dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && !referralInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Failed to Load
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={refreshReferralData}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Referral & Team Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your referrals, build your team, and unlock exclusive rewards
          </p>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "referral", label: "Referral Network", icon: Share2 },
            { id: "team", label: "Team Structure", icon: Network },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "rewards", label: "Rewards", icon: Award },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Overview Section */}
        {activeSection === "overview" && (
          <OverviewSection
            referralInfo={safeReferralInfo}
            teamData={safeTeamData}
            onCopyLink={copyToClipboard}
            copied={copied}
          />
        )}

        {/* Referral Network Section */}
        {activeSection === "referral" && (
          <ReferralNetworkSection
            referralInfo={safeReferralInfo}
            referralAnalytics={referralAnalytics}
            viewMode={referralView}
            onViewModeChange={setReferralView}
            onCopyLink={copyToClipboard}
            copied={copied}
          />
        )}

        {/* Team Structure Section */}
        {activeSection === "team" && (
          <TeamStructureSection
            teamData={safeTeamData}
            viewMode={teamView}
            onViewModeChange={setTeamView}
          />
        )}

        {/* Analytics Section */}
        {activeSection === "analytics" && (
          <AnalyticsSection
            referralInfo={safeReferralInfo}
            referralAnalytics={referralAnalytics}
            teamData={safeTeamData}
          />
        )}

        {/* Rewards Section */}
        {activeSection === "rewards" && (
          <RewardsSection referralInfo={safeReferralInfo} />
        )}
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({ referralInfo, teamData, onCopyLink, copied }) => {
  const stats = [
    {
      label: "Total Referrals",
      value: referralInfo.referralCount,
      icon: UserPlus,
      color: "blue",
      description: "People who joined using your code",
    },
    {
      label: "Direct Team",
      value: teamData?.summary?.directReferrals || referralInfo.referrals?.length || 0,
      icon: Users,
      color: "green",
      description: "Your immediate referrals",
    },
    {
      label: "Total Team",
      value: teamData?.summary?.totalTeamMembers || referralInfo.referrals?.length || 0,
      icon: Network,
      color: "purple",
      description: "Entire network under you",
    },
    {
      label: "Team Levels",
      value: teamData?.summary?.teamDepth || 1,
      icon: ListTree,
      color: "orange",
      description: "Depth of your network",
    },
  ];

  const getLevelBadge = (level) => {
    const levels = {
      1: { label: "Starter", color: "gray", icon: Star },
      2: { label: "Influencer", color: "blue", icon: Zap },
      3: { label: "Ambassador", color: "purple", icon: Crown },
    };
    return levels[level] || levels[1];
  };

  const levelBadge = getLevelBadge(referralInfo.referralLevel);

  return (
    <div className="space-y-6">
      {/* Level Badge */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Your Current Level
            </h2>
            <p className="text-gray-600 mt-1">
              Keep referring to unlock higher levels and better rewards
            </p>
          </div>
          <div className={`bg-${levelBadge.color}-100 px-4 py-3 rounded-lg flex items-center gap-3`}>
            <levelBadge.icon className={`w-6 h-6 text-${levelBadge.color}-600`} />
            <div>
              <div className={`text-${levelBadge.color}-800 font-semibold`}>
                Level {referralInfo.referralLevel}
              </div>
              <div className={`text-${levelBadge.color}-600 text-sm`}>
                {levelBadge.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
              <div className={`text-2xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{stat.label}</h3>
            <p className="text-sm text-gray-600">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Link Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-3">Your Referral Link</h3>
          <p className="text-blue-100 mb-4">
            Share this link to grow your team and earn rewards
          </p>
          <div className="flex gap-2">
            <input
              value={referralInfo.referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-blue-400/20 border border-blue-300/30 rounded-lg text-white placeholder-blue-200"
              placeholder="Your referral link"
            />
            <button
              onClick={() => onCopyLink(referralInfo.referralLink)}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Next Level Progress
          </h3>
          <div className="space-y-3">
            {[
              {
                level: 1,
                required: 0,
                current: referralInfo.referralCount,
                label: "Starter",
              },
              {
                level: 2,
                required: 5,
                current: referralInfo.referralCount,
                label: "Influencer",
              },
              {
                level: 3,
                required: 20,
                current: referralInfo.referralCount,
                label: "Ambassador",
              },
            ].map((item) => {
              const progress = Math.min(item.current, item.required);
              const percentage = item.required > 0 ? Math.min((progress / item.required) * 100, 100) : 100;
              
              return (
                <div key={item.level}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      Level {item.level}
                    </span>
                    <span className="text-gray-500">
                      {progress}/{item.required}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.current >= item.required
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Referral Network Section Component
const ReferralNetworkSection = ({
  referralInfo,
  referralAnalytics,
  viewMode,
  onViewModeChange,
  onCopyLink,
  copied,
}) => {
  const viewModes = [
    { id: "grid", label: "Grid View", icon: Table },
    { id: "list", label: "List View", icon: ListTree },
    { id: "stats", label: "Statistics", icon: BarChart3 },
  ];

  const referrals = referralInfo.referrals || [];

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex flex-wrap gap-2">
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onViewModeChange(mode.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              viewMode === mode.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
            }`}
          >
            <mode.icon className="w-4 h-4" />
            {mode.label}
          </button>
        ))}
      </div>

      {/* Referral Link Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Your Referral Tools
            </h3>
            <p className="text-gray-600">Share your unique code and link</p>
          </div>
          <Share2 className="w-8 h-8 text-blue-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referral Link
            </label>
            <div className="flex gap-2">
              <input
                value={referralInfo.referralLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <button
                onClick={() => onCopyLink(referralInfo.referralLink)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referral Code
            </label>
            <div className="flex gap-2">
              <code className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-lg font-mono text-center">
                {referralInfo.referralCode}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Referrals Display */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Your Referrals
            </h3>
            <p className="text-gray-600">
              {referrals.length} people joined using your code
            </p>
          </div>
          <Users className="w-6 h-6 text-gray-400" />
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referrals.map((referral, index) => (
              <div
                key={referral.userId || index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {(referral.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {referral.name || 'Unknown User'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {referral.email || 'No email'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {referral.createdAt ? new Date(referral.createdAt).toLocaleDateString() : 'Unknown date'}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-3">
            {referrals.map((referral, index) => (
              <div
                key={referral.userId || index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {(referral.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{referral.name || 'Unknown User'}</p>
                    <p className="text-sm text-gray-500">{referral.email || 'No email'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {referral.createdAt ? `Joined ${new Date(referral.createdAt).toLocaleDateString()}` : 'Unknown join date'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Level {referral.referralLevel || 1}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {(referral.referralCount || 0)} refs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "stats" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {referrals.length}
              </div>
              <div className="text-blue-800 font-medium">Total Referrals</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {referrals.filter((r) => (r.referralCount || 0) > 0).length}
              </div>
              <div className="text-green-800 font-medium">Active Referrers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {referrals.length}
              </div>
              <div className="text-purple-800 font-medium">
                Direct Referrals
              </div>
            </div>
          </div>
        )}

        {referrals.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No referrals yet
            </h4>
            <p className="text-gray-600 max-w-md mx-auto">
              Share your referral link with friends and start building your network!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Team Structure Section Component
const TeamStructureSection = ({ teamData, viewMode, onViewModeChange }) => {
  const viewModes = [
    { id: "tree", label: "Tree View", icon: Network },
    { id: "list", label: "List View", icon: ListTree },
    { id: "levels", label: "By Levels", icon: Users },
    { id: "comparison", label: "Referral vs Team", icon: PieChart },
  ];

  // Helper to calculate team statistics with safe defaults
  const calculateTeamStats = (teamData) => {
    const summary = teamData?.summary || teamData?.overview?.summary || {};
    
    return {
      totalTeam: summary.totalTeamMembers || 0,
      directReferrals: summary.directReferrals || 0,
      indirectReferrals: summary.indirectReferrals || 
        (summary.totalTeamMembers || 0) - (summary.directReferrals || 0),
      teamDepth: summary.teamDepth || 0,
      growthRate: (summary.directReferrals || 0) > 0
        ? (((summary.totalTeamMembers || 0) / (summary.directReferrals || 1) - 1) * 100)
        : 0,
    };
  };

  const teamStats = calculateTeamStats(teamData);

  const renderTeamTree = (team, level = 1) => {
    if (!team || team.length === 0) {
      return (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            No team members at this level
          </p>
        </div>
      );
    }

    return (
      <div className={`ml-8 border-l-2 border-gray-300 pl-4 ${level > 1 ? "mt-4" : ""}`}>
        {team.map((member, index) => (
          <div key={member.userId || index} className="mb-4">
            <div
              className={`flex items-center space-x-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                level === 1
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${
                  level === 1
                    ? "bg-gradient-to-br from-blue-500 to-blue-600"
                    : "bg-gradient-to-br from-green-500 to-blue-600"
                }`}
              >
                {(member.name || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {member.name || 'Unknown User'}
                    </p>
                    <p className="text-sm text-gray-500">{member.email || 'No email'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          level === 1
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {level === 1 ? "Direct Referral" : `Level ${level}`}
                      </span>
                      {(member.referralCount || 0) > 0 && (
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          {member.referralCount || 0} refs
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'Unknown date'}
                    </p>
                    {member.createdAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        Joined{" "}
                        {Math.floor(
                          (new Date() - new Date(member.createdAt)) / (1000 * 60 * 60 * 24)
                        )}{" "}
                        days ago
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {member.subTeam && renderTeamTree(member.subTeam, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Selector */}
      <div className="flex flex-wrap gap-2">
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onViewModeChange(mode.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              viewMode === mode.id
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-green-300"
            }`}
          >
            <mode.icon className="w-4 h-4" />
            {mode.label}
          </button>
        ))}
      </div>

      {/* Team Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {teamStats.totalTeam}
          </div>
          <div className="text-gray-600 text-sm">Total Team</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-blue-200 text-center bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">
            {teamStats.directReferrals}
          </div>
          <div className="text-blue-700 text-sm">Direct Referrals</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-green-200 text-center bg-green-50">
          <div className="text-2xl font-bold text-green-600">
            {teamStats.indirectReferrals}
          </div>
          <div className="text-green-700 text-sm">Indirect Team</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-purple-200 text-center bg-purple-50">
          <div className="text-2xl font-bold text-purple-600">
            {teamStats.teamDepth}
          </div>
          <div className="text-purple-700 text-sm">Team Depth</div>
        </div>
      </div>

      {/* Team Display */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        {viewMode === "tree" && teamData?.tree?.teamTree && (
          <div>
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  {(teamData.tree.teamTree.user.name || 'You').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    You ({teamData.tree.teamTree.user.name || 'You'})
                  </p>
                  <p className="text-gray-600">
                    Team Size: {teamStats.totalTeam} members (
                    {teamStats.directReferrals} direct + {teamStats.indirectReferrals} indirect)
                  </p>
                </div>
              </div>
            </div>
            {renderTeamTree(teamData.tree.teamTree.team)}
          </div>
        )}

        {viewMode === "comparison" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Direct Referrals */}
              <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Direct Referrals ({teamData?.overview?.directTeam?.length || 0})
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  People who joined using your referral code directly
                </p>
                <div className="space-y-3">
                  {(teamData?.overview?.directTeam || []).map((referral, index) => (
                    <div
                      key={referral.userId || index}
                      className="bg-white p-3 rounded border border-blue-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {(referral.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {referral.name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {referral.email || 'No email'}
                            </p>
                          </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          Direct
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Team */}
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Full Team ({teamStats.totalTeam})
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Your entire network including indirect referrals
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Direct Referrals:</span>
                    <span className="font-semibold text-blue-600">
                      {teamStats.directReferrals}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Indirect Team:</span>
                    <span className="font-semibold text-green-600">
                      {teamStats.indirectReferrals}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Levels:</span>
                    <span className="font-semibold text-purple-600">
                      {teamStats.teamDepth}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Multiplier:</span>
                    <span className="font-semibold text-orange-600">
                      {teamStats.growthRate > 0 ? `${teamStats.growthRate.toFixed(1)}x` : "1.0x"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add empty state for other view modes */}
        {(viewMode === "list" || viewMode === "levels") && (
          <div className="text-center py-12">
            <ListTree className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {viewMode === "list" ? "List View" : "Levels View"}
            </h4>
            <p className="text-gray-500">
              This view mode is coming soon. Currently showing Tree View.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Analytics Section Component
const AnalyticsSection = ({ referralInfo, referralAnalytics, teamData }) => {
  const activeReferrers = (referralInfo.referrals || []).filter((r) => (r.referralCount || 0) > 0).length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Growth Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Conversion Rate</span>
              <span className="font-semibold text-green-600">85%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Active Referrers</span>
              <span className="font-semibold text-blue-600">{activeReferrers}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Team Growth Rate</span>
              <span className="font-semibold text-purple-600">+12%</span>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Overview
          </h3>
          <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Analytics chart coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Team Activity
        </h3>
        <div className="space-y-3">
          {(referralAnalytics?.referralHistory?.slice(0, 5) || []).map((event, index) => (
            <div
              key={event.eventId || index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <UserCheck className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">
                    {event.referee?.name || "New Member"}
                  </p>
                  <p className="text-sm text-gray-500">joined your team</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'Recent'}
                </p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {event.eventType || 'referral'}
                </span>
              </div>
            </div>
          ))}
          
          {(!referralAnalytics?.referralHistory || referralAnalytics.referralHistory.length === 0) && (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No recent activity to display
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Rewards Section Component
const RewardsSection = ({ referralInfo }) => {
  const referralCount = referralInfo.referralCount || 0;
  
  const rewards = [
    {
      level: 1,
      name: "Starter",
      required: 0,
      rewards: [
        "Basic commission rates",
        "Referral tracking",
        "Standard support",
      ],
      unlocked: true,
      current: referralCount >= 0 && referralCount < 5,
    },
    {
      level: 2,
      name: "Influencer",
      required: 5,
      rewards: [
        "Enhanced commission rates",
        "Priority support",
        "Advanced analytics",
        "Bonus rewards",
      ],
      unlocked: referralCount >= 5,
      current: referralCount >= 5 && referralCount < 20,
    },
    {
      level: 3,
      name: "Ambassador",
      required: 20,
      rewards: [
        "Maximum commission rates",
        "VIP support",
        "Exclusive features",
        "Early access",
        "Personal manager",
      ],
      unlocked: referralCount >= 20,
      current: referralCount >= 20,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Rewards & Benefits
        </h2>
        <p className="text-gray-600">
          Unlock exclusive rewards as you grow your team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const progress = Math.min(referralCount, reward.required);
          const percentage = reward.required > 0 ? Math.min((progress / reward.required) * 100, 100) : 100;
          
          return (
            <div
              key={reward.level}
              className={`rounded-2xl p-6 border-2 transition-all ${
                reward.current
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-yellow-500 transform scale-105 shadow-lg"
                  : reward.unlocked
                  ? "bg-white border-green-500 shadow-sm"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="text-center mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    reward.current
                      ? "bg-white text-orange-500"
                      : reward.unlocked
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Award className="w-8 h-8" />
                </div>
                <h3
                  className={`text-xl font-bold ${
                    reward.current
                      ? "text-white"
                      : reward.unlocked
                      ? "text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {reward.name}
                </h3>
                <p
                  className={`text-sm ${
                    reward.current
                      ? "text-yellow-100"
                      : reward.unlocked
                      ? "text-gray-600"
                      : "text-gray-500"
                  }`}
                >
                  {reward.required}+ referrals required
                </p>
              </div>

              <div className="space-y-2">
                {reward.rewards.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        reward.current
                          ? "bg-white"
                          : reward.unlocked
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        reward.current
                          ? "text-white"
                          : reward.unlocked
                          ? "text-gray-700"
                          : "text-gray-500"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`mt-4 pt-4 border-t ${
                reward.current ? "border-white border-opacity-20" : "border-gray-200"
              }`}>
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span>
                    {progress}/{reward.required}
                  </span>
                </div>
                <div className={`w-full rounded-full h-2 mt-2 ${
                  reward.current ? "bg-white bg-opacity-30" : "bg-gray-200"
                }`}>
                  <div
                    className={`h-2 rounded-full ${
                      reward.unlocked
                        ? reward.current
                          ? "bg-white"
                          : "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferralDashboard;