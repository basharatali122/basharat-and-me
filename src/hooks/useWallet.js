import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosinstance';

export const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/wallet/balance');
      setWallet(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const addBalance = async (amount, paymentMethod) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/wallet/add-balance', {
        amount,
        payment_method: paymentMethod
      });
      await fetchBalance(); // Refresh balance
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add balance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const requestWithdrawal = async (withdrawalData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/withdrawal/request', withdrawalData);
      await fetchBalance(); // Refresh balance
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request withdrawal');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    wallet,
    loading,
    error,
    fetchBalance,
    addBalance,
    requestWithdrawal
  };
};
