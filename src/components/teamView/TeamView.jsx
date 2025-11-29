import React, { useState, useEffect } from 'react';
import useTeam from '../../hooks/useTeam';

const TeamView = () => {
  const { teamData, loading, error, fetchTeamTree, fetchTeamList } = useTeam();
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'tree', 'list'
  const [teamTree, setTeamTree] = useState(null);
  const [teamList, setTeamList] = useState(null);

  useEffect(() => {
    if (viewMode === 'tree') {
      loadTeamTree();
    } else if (viewMode === 'list') {
      loadTeamList();
    }
  }, [viewMode]);

  const loadTeamTree = async () => {
    try {
      const data = await fetchTeamTree();
      setTeamTree(data.teamTree);
    } catch (err) {
      console.error('Failed to load team tree:', err);
    }
  };

  const loadTeamList = async () => {
    try {
      const data = await fetchTeamList();
      setTeamList(data);
    } catch (err) {
      console.error('Failed to load team list:', err);
    }
  };

  if (loading && !teamData) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!teamData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* View Mode Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setViewMode('overview')}
          className={`px-4 py-2 font-medium ${
            viewMode === 'overview' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setViewMode('tree')}
          className={`px-4 py-2 font-medium ${
            viewMode === 'tree' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Team Tree
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 font-medium ${
            viewMode === 'list' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Team List
        </button>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && <TeamOverview data={teamData} />}
      {viewMode === 'tree' && <TeamTreeView data={teamTree} />}
      {viewMode === 'list' && <TeamListView data={teamList} />}
    </div>
  );
};

// Team Overview Component
const TeamOverview = ({ data }) => {
  const { teamStats, directTeam, summary } = data;

  return (
    <div className="space-y-6">
      {/* Team Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{summary.totalTeamMembers}</div>
          <div className="text-gray-600">Total Team</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{summary.directReferrals}</div>
          <div className="text-gray-600">Direct Referrals</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{summary.teamDepth}</div>
          <div className="text-gray-600">Team Depth</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {summary.directReferrals > 0 ? ((summary.totalTeamMembers / summary.directReferrals).toFixed(1)) : 0}
          </div>
          <div className="text-gray-600">Avg. per Direct</div>
        </div>
      </div>

      {/* Direct Team Members */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Direct Team Members</h2>
        {directTeam && directTeam.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directTeam.map((member, index) => (
              <div key={member.userId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined: {new Date(member.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Level {member.referralLevel}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    {member.referralCount} refs
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No direct team members yet</p>
        )}
      </div>
    </div>
  );
};

// Team Tree Component
const TeamTreeView = ({ data }) => {
  if (!data) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderTeamTree = (team, level = 1) => {
    if (!team || team.length === 0) return null;

    return (
      <div className={`ml-6 border-l-2 border-gray-200 pl-4 ${level > 1 ? 'mt-2' : ''}`}>
        {team.map((member, index) => (
          <div key={member.userId || index} className="mb-3">
            <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Level {level}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {member.referralCount || 0} refs
                  </span>
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
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Your Team Tree</h2>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {data.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">You ({data.user.name})</p>
            <p className="text-sm text-gray-600">Team Size: {data.user.teamSize}</p>
          </div>
        </div>
      </div>
      {data.team && data.team.length > 0 ? (
        renderTeamTree(data.team)
      ) : (
        <p className="text-gray-500 text-center py-8">No team members yet. Start referring to build your team!</p>
      )}
    </div>
  );
};

// Team List Component
const TeamListView = ({ data }) => {
  if (!data) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { teamList, teamByLevels, totalMembers, levels } = data;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalMembers}</div>
            <div className="text-gray-600">Total Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{levels}</div>
            <div className="text-gray-600">Team Levels</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {totalMembers > 0 ? (totalMembers / levels).toFixed(1) : 0}
            </div>
            <div className="text-gray-600">Avg. per Level</div>
          </div>
        </div>
      </div>

      {/* Team by Levels */}
      <div className="space-y-4">
        {Object.entries(teamByLevels).map(([level, members]) => (
          <div key={level} className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              Level {level}
              <span className="ml-2 bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {members.length} members
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member, index) => (
                <div key={member.userId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500 truncate">{member.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-gray-500">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {member.referralCount || 0} refs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamView;