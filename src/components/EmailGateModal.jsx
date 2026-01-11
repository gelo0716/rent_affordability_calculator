import React, { useState } from 'react';
import Icon from './AppIcon';
import { emailService } from '../services/emailService';

const EmailGateModal = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  title = "Unlock Premium Financial Insights",
  description = "Get personalized recommendations and expert financial advice tailored to your situation."
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    // Validate email
    if (!email || !emailService?.validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit email to Supabase
      const result = await emailService?.submitEmailForAccess(email);

      if (result?.success) {
        setIsSuccess(true);
        
        // Sync to Google Sheets
        await emailService?.syncToGoogleSheets(email);
        
        // Call success callback after a brief delay
        setTimeout(() => {
          onSuccess?.(email);
          handleClose();
        }, 1500);
      } else {
        setError(result?.message || 'Failed to submit email. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    setIsSubmitting(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isSubmitting}
        >
          <Icon name="X" size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <Icon name="Lock" size={24} color="var(--color-primary)" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {isSuccess ? (
          /* Success State */
          (<div className="text-center py-4">
            <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
              <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            </div>
            <h3 className="text-lg font-semibold text-success mb-2">Access Granted!</h3>
            <p className="text-sm text-muted-foreground">
              Unlocking your personalized financial insights...
            </p>
          </div>)
        ) : (
          /* Email Form */
          (<form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Icon 
                  name="Mail" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  disabled={isSubmitting}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-error mt-2 flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} />
                  <span>{error}</span>
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Icon name="Unlock" size={16} />
                  <span>Unlock Premium Content</span>
                </>
              )}
            </button>
          </form>)
        )}

        {/* Privacy Notice */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-start space-x-2 text-xs text-muted-foreground">
            <Icon name="Shield" size={14} className="mt-0.5 flex-shrink-0" />
            <p>
              We respect your privacy. Your email will only be used to provide personalized 
              financial insights and will never be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGateModal;