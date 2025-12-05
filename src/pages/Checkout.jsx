import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useWallet } from '../hooks/useWallet';
import { useCheckout } from '../hooks/useCheckout';

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const { wallet } = useWallet();
  const { processCheckout } = useCheckout();
  
  const [paymentMethod, setPaymentMethod] = useState('zindigi');
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    card_number: '',
    holder_name: '',
    expiry: '',
    cvv: ''
  });

  const totalWalletBalance = wallet ? 
    parseFloat(wallet.balance) + parseFloat(wallet.bonus_balance) : 0;
  
  const amountToPay = useWalletBalance ? 
    Math.max(0, cartTotal - totalWalletBalance) : cartTotal;

  const handleCheckout = async () => {
    try {
      const checkoutData = {
        payment_method: paymentMethod,
        use_wallet_balance: useWalletBalance,
        card_details: paymentMethod === 'zindigi' ? cardDetails : null
      };
      
      const result = await processCheckout(checkoutData);
      
      if (result.success) {
        // Redirect to success page
        window.location.href = '/order-success';
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      {/* Wallet Balance Display */}
      {wallet && (
        <div className="wallet-info">
          <h3>Your Wallet</h3>
          <p>Balance: PKR {wallet.balance}</p>
          <p>Bonus: PKR {wallet.bonus_balance}</p>
          <p>Total: PKR {totalWalletBalance}</p>
          
          <label>
            <input
              type="checkbox"
              checked={useWalletBalance}
              onChange={(e) => setUseWalletBalance(e.target.checked)}
            />
            Use wallet balance
          </label>
        </div>
      )}

      {/* Payment Method Selection */}
      <div className="payment-method">
        <h3>Payment Method</h3>
        
        <label>
          <input
            type="radio"
            value="zindigi"
            checked={paymentMethod === 'zindigi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={amountToPay === 0}
          />
          Credit/Debit Card (Zindigi)
        </label>
        
        <label>
          <input
            type="radio"
            value="wallet"
            checked={paymentMethod === 'wallet'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={totalWalletBalance < cartTotal}
          />
          Pay with Wallet
        </label>
        
        <label>
          <input
            type="radio"
            value="mixed"
            checked={paymentMethod === 'mixed'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            disabled={totalWalletBalance === 0}
          />
          Wallet + Card
        </label>
      </div>

      {/* Card Details Form */}
      {(paymentMethod === 'zindigi' || paymentMethod === 'mixed') && amountToPay > 0 && (
        <div className="card-details">
          <h3>Card Details</h3>
          <input
            type="text"
            placeholder="Card Number"
            value={cardDetails.card_number}
            onChange={(e) => setCardDetails({...cardDetails, card_number: e.target.value})}
          />
          <input
            type="text"
            placeholder="Card Holder Name"
            value={cardDetails.holder_name}
            onChange={(e) => setCardDetails({...cardDetails, holder_name: e.target.value})}
          />
          <input
            type="text"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
          />
        </div>
      )}

      {/* Order Summary */}
      <div className="order-summary">
        <p>Cart Total: PKR {cartTotal}</p>
        {useWalletBalance && (
          <>
            <p>Wallet Used: PKR {Math.min(totalWalletBalance, cartTotal)}</p>
            <p>Amount to Pay: PKR {amountToPay}</p>
          </>
        )}
      </div>

      <button onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
