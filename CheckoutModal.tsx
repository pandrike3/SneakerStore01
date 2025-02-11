import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { PaymentMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onCompleteCheckout: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  total,
  onCompleteCheckout,
}: CheckoutModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  const savedPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'credit',
      lastFourDigits: '4242',
      expiryDate: '12/24',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteCheckout();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Checkout</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
              <div className="text-xl font-semibold mb-4">
                Total: ${total.toFixed(2)}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Saved Payment Methods</h4>
                    <div className="mt-2 space-y-2">
                      {savedPaymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="payment"
                            className="h-4 w-4 text-indigo-600"
                            onChange={() => setSelectedPayment(method)}
                          />
                          <CreditCard className="ml-3 h-5 w-5 text-gray-400" />
                          <span className="ml-3">
                            •••• {method.lastFourDigits} (expires {method.expiryDate})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Add New Card</h4>
                    <div className="mt-2 space-y-3">
                      <input
                        type="text"
                        placeholder="Card number"
                        value={newCard.number}
                        onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                          className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          value={newCard.cvc}
                          onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                          className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Complete Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}