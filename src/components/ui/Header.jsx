import React from 'react';
import Icon from '../AppIcon';

const Header = ({ className = '' }) => {
  const handleShare = async () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://rent-affordability-calculator.rentwithclara.com';
    const shareData = {
      title: 'Rent Affordability Calculator | How Much Rent Can I Afford?',
      text: 'Find out how much rent you can afford with this simple calculator. Get your results in seconds!',
      url: window?.location?.href || siteUrl
    };

    // Method 1: Try Web Share API (but skip canShare check as it can be unreliable)
    if (navigator?.share) {
      try {
        await navigator.share(shareData);
        return; // Success, exit early
      } catch (error) {
        console.log('Web Share API failed, trying clipboard fallback:', error);
        // Don't return here, continue to fallback methods
      }
    }

    // Method 2: Try modern clipboard API
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard?.writeText(shareData?.url);
        showSuccessNotification('✓ Link copied to clipboard!');
        return; // Success, exit early
      } catch (error) {
        console.log('Clipboard API failed, trying legacy method:', error);
        // Continue to next fallback
      }
    }

    // Method 3: Legacy clipboard method
    try {
      const textArea = document.createElement('textarea');
      textArea.value = shareData?.url;
      textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
      document.body?.appendChild(textArea);
      textArea?.focus();
      textArea?.select();
      
      const successful = document.execCommand('copy');
      document.body?.removeChild(textArea);
      
      if (successful) {
        showSuccessNotification('✓ Link copied to clipboard!');
        return; // Success, exit early
      }
    } catch (error) {
      console.log('Legacy copy method failed:', error);
    }

    // Method 4: Final fallback - prompt user to copy manually
    try {
      const userCopied = prompt('Copy this link to share:', shareData?.url);
      if (userCopied !== null) {
        showSuccessNotification('✓ Share link ready!');
      }
    } catch (error) {
      console.error('All sharing methods failed:', error);
      // Show friendly error message
      showErrorNotification('❌ Unable to share. Please copy the URL from your browser.');
    }
  };

  const showSuccessNotification = (message) => {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `;
    
    // Add CSS animation
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head?.appendChild(style);
    }
    
    document.body?.appendChild(notification);
    setTimeout(() => {
      if (notification?.parentNode) {
        document.body?.removeChild(notification);
      }
    }, 3000);
  };

  const showErrorNotification = (message) => {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body?.appendChild(notification);
    setTimeout(() => {
      if (notification?.parentNode) {
        document.body?.removeChild(notification);
      }
    }, 4000);
  };

  return (
    <header className={`w-full bg-background border-b border-border shadow-soft ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <a
            href="https://www.rentwithclara.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white">
              <img
                src="/assets/images/Screenshot_2025-09-14_at_9.23.39_AM-1757813056669.png"
                alt="Rent with Clara Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-[#4e2a1f] leading-tight">Rent Affordability Calculator</h1>
              <span className="text-sm text-muted-foreground leading-tight">Rent with Clara</span>
            </div>
          </a>
        </div>

        {/* Right Section - Optional Actions */}
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
            onClick={() => {
              // Help functionality - could open a modal or redirect to help page
              window.open('https://www.rentwithclara.com/help', '_blank', 'noopener,noreferrer');
            }}>
            <Icon name="HelpCircle" size={18} color="#ffb470" />
            <span className="hidden sm:inline">Help</span>
          </button>
          
          <button
            className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted active:scale-95 transition-transform"
            onClick={handleShare}
            title="Share this calculator">
            <Icon name="Share2" size={18} color="#ffb470" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;