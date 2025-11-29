import { useState, useEffect } from "react";
import api from "../utils/axiosInstance";

const useTeam = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Normalize API response into UI-expected format
  const normalizeTeamOverview = (data) => {
    return {
      overview: {
        summary: {
          totalTeamMembers: data.summary?.totalTeamMembers || 0,
          directReferrals: data.summary?.directReferrals || 0,
          indirectReferrals:
            (data.summary?.totalTeamMembers || 0) -
            (data.summary?.directReferrals || 0),
          teamDepth: data.summary?.teamDepth || 0,
        },
        directTeam: data.directTeam || [],
      },

      // Build simple 1-level team tree
      tree: {
        teamTree: {
          user: { name: "You" },
          team: (data.directTeam || []).map((m) => ({
            ...m,
            subTeam: [], // deeper levels if needed
          })),
        },
      },

      // List view compatibility
      list: data.directTeam || [],
    };
  };

  const fetchTeamOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/team/overview");

      const normalized = normalizeTeamOverview(response.data);
      setTeamData(normalized);

      return normalized;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch team data");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamOverview();
  }, []);

  return {
    teamData,
    loading,
    error,
    refreshTeamData: fetchTeamOverview,
  };
};

export default useTeam;
