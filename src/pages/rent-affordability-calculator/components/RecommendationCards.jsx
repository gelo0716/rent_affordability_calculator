import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';



const RecommendationCards = ({ 
  monthlyIncome, 
  nonRentExpenses, 
  rentPercentage, 
  isPremiumUnlocked, 
  onUnlockRequest 
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const calculateRecommendations = () => {
    if (!monthlyIncome || !nonRentExpenses) {
      return [];
    }

    const income = parseInt(monthlyIncome);
    const expenses = parseInt(nonRentExpenses);
    const currentRent = Math.round(income * rentPercentage / 100);
    const disposableIncome = income - currentRent - expenses;

    const recommendations = [];

    // Rent percentage analysis with Clara tone
    if (rentPercentage <= 25) {
      recommendations?.push({
        type: 'success',
        icon: 'CheckCircle2',
        title: 'You\'re Being Super Smart! 🌟',
        description: 'At ' + rentPercentage + '% of income, you\'re well within the safe zone. This gives you tons of room for savings and fun stuff!',
        action: 'Consider investing the extra money or building an emergency fund.',
        priority: 1
      });
    } else if (rentPercentage <= 30) {
      recommendations?.push({
        type: 'success',
        icon: 'CheckCircle2',
        title: 'Right in the Sweet Spot! 🎯',
        description: 'The 30% rule exists for a reason - you\'re following it perfectly. This should leave you comfortable.',
        action: 'You\'re on track! Keep an eye on other expenses to maintain this balance.',
        priority: 1
      });
    } else if (rentPercentage <= 40) {
      recommendations?.push({
        type: 'warning',
        icon: 'AlertTriangle',
        title: 'Getting a Bit Risky 🤔',
        description: 'At ' + rentPercentage + '%, you might feel the squeeze. It\'s doable, but leaves less room for surprises.',
        action: 'Consider looking for places around $' + formatCurrency(Math.round(income * 0.3)) + ' to get back to the 30% sweet spot.',
        priority: 1
      });
    } else {
      recommendations?.push({
        type: 'error',
        icon: 'AlertCircle',
        title: 'This Might Be Too Much 🚨',
        description: 'Over 40% can put serious strain on your budget. You might struggle with other expenses.',
        action: 'Strongly consider places under $' + formatCurrency(Math.round(income * 0.3)) + ' or ways to increase your income.',
        priority: 1
      });
    }

    // Disposable income recommendations
    if (disposableIncome < 0) {
      recommendations?.push({
        type: 'error',
        icon: 'AlertCircle',
        title: 'Houston, We Have a Problem 🛑',
        description: 'Your expenses exceed your income by $' + formatCurrency(Math.abs(disposableIncome)) + '. This isn\'t sustainable.',
        action: 'Either find a cheaper place, reduce expenses, or boost your income before signing any lease.',
        priority: 2
      });
    } else if (disposableIncome < 200) {
      recommendations?.push({
        type: 'warning',
        icon: 'AlertTriangle',
        title: 'Living Paycheck to Paycheck 😬',
        description: 'With only $' + formatCurrency(disposableIncome) + ' left over, one surprise expense could cause problems.',
        action: 'Try to find $200+ breathing room by negotiating rent or trimming other costs.',
        priority: 2
      });
    } else if (disposableIncome >= 500) {
      recommendations?.push({
        type: 'success',
        icon: 'CheckCircle2',
        title: 'You\'ve Got This Covered! 💪',
        description: 'With $' + formatCurrency(disposableIncome) + ' left over, you have good financial breathing room.',
        action: 'Perfect! Consider putting some of this toward an emergency fund or retirement savings.',
        priority: 2
      });
    }

    // Income-based recommendations
    if (income >= 8000) {
      recommendations?.push({
        type: 'info',
        icon: 'TrendingUp',
        title: 'High Earner Perks 🏆',
        description: 'Your income gives you more flexibility. Consider neighborhoods that offer good value.',
        action: 'You might afford premium locations, but don\'t forget about saving and investing!',
        priority: 3
      });
    } else if (income < 3000) {
      recommendations?.push({
        type: 'info',
        icon: 'Heart',
        title: 'Budget-Conscious Tips 💝',
        description: 'Every dollar counts at your income level. Consider roommates or slightly outside city center.',
        action: 'Look for places with utilities included, or consider shared housing to stretch your budget.',
        priority: 3
      });
    }

    return recommendations?.sort((a, b) => a?.priority - b?.priority);
  };

  const recommendations = calculateRecommendations();

  // Simplified getIconColor for 3-state system
  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return '#2CB853'; // Green
      case 'warning':
        return '#FAD75E'; // Yellow
      case 'error':
        return '#E16733'; // Orange
      case 'info':
        return '#E16733'; // Orange for info (Clara primary)
      default:
        return '#12401F'; // Dark Green
    }
  };

  if (!isPremiumUnlocked) {
    return (
      <div className="relative">
        {/* Blurred Preview */}
        <div className="filter blur-sm pointer-events-none">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center">
              <Icon name="Target" size={24} color="#E16733" className="mr-3" />
              Your Personal Recommendations
            </h2>
            <p className="text-muted-foreground">Smart insights tailored to your budget</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="clara-card">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg flex-shrink-0">
                    <Icon name="CheckCircle2" size={20} color="#2CB853" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Perfect Budget Zone! 🎯</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      You're following the golden 30% rule perfectly. This gives you plenty of room for other expenses and savings.
                    </p>
                    <div className="text-xs font-medium bg-background/50 p-2 rounded-lg text-foreground">
                      💡 Pro tip: Consider setting up automatic savings with your extra budget room!
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Unlock Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
          <div className="text-center p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
              <Icon name="Lock" size={24} color="#E16733" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Get Your Personal Recommendations! 🎯</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Unlock smart, personalized advice based on your specific budget and goals.
            </p>
            <button 
              onClick={onUnlockRequest}
              className="clara-cta flex items-center space-x-2 mx-auto"
            >
              <Icon name="Unlock" size={18} color="white" />
              <span>Show Me My Recommendations</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center">
          <Icon name="Target" size={24} color="#E16733" className="mr-3" />
          Your Personal Recommendations 🎯
        </h2>
        <p className="text-muted-foreground">Here's what we think based on your numbers</p>
      </div>
      {recommendations?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations?.map((rec, index) => (
            <div key={index} className="clara-card">
              <div className="flex items-start space-x-4">
                {/* Small Icon Badge Only */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                  rec?.type === 'success' ? 'bg-success/10' :
                  rec?.type === 'warning' ? 'bg-warning/10' :
                  rec?.type === 'error' ? 'bg-error/10' : 'bg-primary/10'
                }`}>
                  <Icon name={rec?.icon} size={20} color={getIconColor(rec?.type)} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{rec?.title}</h3>
                  <p className="text-sm clara-friendly-text mb-3">
                    {rec?.description}
                  </p>
                  <div className="text-xs font-medium bg-background/50 p-2 rounded-lg text-foreground">
                    💡 {rec?.action}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="clara-card text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mx-auto mb-4">
            <Icon name="Target" size={32} color="#6B5B47" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Ready for Your Recommendations?</h3>
          <p className="text-sm clara-friendly-text">
            Fill in your income and expenses above to get personalized advice! 🚀
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationCards;