import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useReferral = () => {
  const [referralInfo, setReferralInfo] = useState(null);
  const [referralAnalytics, setReferralAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReferralInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/referral/info");

      const data = res.data;

      // Normalize to UI-friendly structure
      setReferralInfo({
        referralCode: data.referralCode,
        referralLink: data.referralLink,
        referrals: data.directTeam || [], // map directly from API
      });

      return data;
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to fetch referral information"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchReferralAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosInstance.get("/referral/analytics");

      const data = res.data;

      setReferralAnalytics({
        totalReferrals: data.teamStats?.directReferrals || 0,
      });

      return data;
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to fetch referral analytics"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshReferralData = async () => {
    await Promise.all([fetchReferralInfo(), fetchReferralAnalytics()]);
  };

  return {
    referralInfo,
    referralAnalytics,
    loading,
    error,
    fetchReferralInfo,
    fetchReferralAnalytics,
    refreshReferralData,
  };
};

export default useReferral;
