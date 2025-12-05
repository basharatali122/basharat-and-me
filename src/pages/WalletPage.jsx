import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletPage = () => {
  const { wallet, addBalance, requestWithdrawal, loading } = useWallet();
  const [amount, setAmount] = useState('');
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    bank_name: '',
    account_number: '',
    account_title: '',
    iban: ''
  });

  const handleAddBalance = async () => {
    try {
      await addBalance(parseFloat(amount), 'zindigi');
      alert('Balance added successfully!');
      setAmount('');
      setShowAddBalance(false);
    } catch (error) {
      alert('Failed to add balance');
    }
  };

  const handleWithdrawal = async () => {
    try {
      await requestWithdrawal(withdrawalData);
      alert('Withdrawal request submitted! It will be processed within 24 hours.');
      setWithdrawalData({
        amount: '',
        bank_name: '',
        account_number: '',
        account_title: '',
        iban: ''
      });
      setShowWithdraw(false);
    } catch (error) {
      alert('Failed to request withdrawal');
    }
  };

  if (!wallet) return <div>Loading...</div>;

  return (
    <div className="wallet-page">
      <h1>My Wallet</h1>
      
      <div className="wallet-balance">
        <div className="balance-card">
          <h3>Main Balance</h3>
          <p className="amount">PKR {wallet.balance}</p>
        </div>
        
        <div className="balance-card">
          <h3>Bonus Balance</h3>
          <p className="amount">PKR {wallet.bonus_balance}</p>
        </div>
        
        <div className="balance-card">
          <h3>Total Balance</h3>
          <p className="amount">PKR {wallet.total_balance}</p>
        </div>
      </div>

      <div className="wallet-actions">
        <button onClick={() => setShowAddBalance(true)}>
          Add Balance
        </button>
        <button onClick={() => setShowWithdraw(true)}>
          Withdraw
        </button>
      </div>

      {/* Add Balance Modal */}
      {showAddBalance && (
        <div className="modal">
          <h3>Add Balance</h3>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="bonus-info">
            You will receive 10% bonus on this amount!
          </p>
          <button onClick={handleAddBalance} disabled={loading}>
            {loading ? 'Processing...' : 'Add Balance'}
          </button>
          <button onClick={() => setShowAddBalance(false)}>Cancel</button>
        </div>
      )}

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div className="modal">
          <h3>Request Withdrawal</h3>
          <input
            type="number"
            placeholder="Amount (Min: PKR 500)"
            value={withdrawalData.amount}
            onChange={(e) => setWithdrawalData({...withdrawalData, amount: e.target.value})}
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={withdrawalData.bank_name}
            onChange={(e) => setWithdrawalData({...withdrawalData, bank_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Account Number"
            value={withdrawalData.account_number}
            onChange={(e) => setWithdrawalData({...withdrawalData, account_number: e.target.value})}
          />
          <input
            type="text"
            placeholder="Account Title"
            value={withdrawalData.account_title}
            onChange={(e) => setWithdrawalData({...withdrawalData, account_title: e.target.value})}
          />
          <input
            type="text"
            placeholder="IBAN (Optional)"
            value={withdrawalData.iban}
            onChange={(e) => setWithdrawalData({...withdrawalData, iban: e.target.value})}
          />
          <p className="withdrawal-info">
            Withdrawal requests are processed within 24 hours
          </p>
          <button onClick={handleWithdrawal} disabled={loading}>
            {loading ? 'Processing...' : 'Submit Request'}
          </button>
          <button onClick={() => setShowWithdraw(false)}>Cancel</button>
        </div>
      )}

      <div className="wallet-stats">
        <p>Total Earned: PKR {wallet.total_earned}</p>
        <p>Total Withdrawn: PKR {wallet.total_withdrawn}</p>
      </div>
    </div>
  );
};

export default WalletPage;
