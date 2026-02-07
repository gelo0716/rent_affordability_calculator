import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { emailService } from '../../../services/emailService';

const EmailCaptureModal = ({ isOpen, onClose, onSuccess, sessionData }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate email locally first
    if (!emailService.validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Submit email for access
      const accessResult = await emailService.submitEmailForAccess(email);
      
      if (!accessResult.success) {
        throw new Error(accessResult.message);
      }

      // 2. Save the current session data (optional but good for data)
      if (sessionData) {
        await emailService.saveCalculatorSession(email, sessionData);
      }

      // Success!
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary/5 p-6 text-center border-b border-border">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Icon name="Lock" size={24} color="#E16733" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Unlock Your Renter's Edge</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Get your <b>Landlord Approval Score</b> and a professional <b>Rent Resume</b>.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-error flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span> Unlocking...
                </span>
              ) : (
                'Unlock My Full Report'
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              We respect your privacy. No spam, just helpful rent tips.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
    </div>
  );
};

export default EmailCaptureModal;
