import React from 'react';
import Icon from '../../../components/AppIcon';

const CalculationResultsPanel = ({
  monthlyIncome,
  nonRentExpenses,
  rentPercentage
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const calculateResults = () => {
    if (!monthlyIncome || !nonRentExpenses) {
      return {
        maxRent: 0,
        disposableIncome: 0,
        rentToIncomeRatio: 0,
        remainingAfterRent: 0
      };
    }

    const income = parseInt(monthlyIncome);
    const expenses = parseInt(nonRentExpenses);
    const maxRent = Math.round(income * rentPercentage / 100);
    const remainingAfterRent = income - maxRent;
    const disposableIncome = remainingAfterRent - expenses;
    const rentToIncomeRatio = rentPercentage;

    return {
      maxRent,
      disposableIncome,
      rentToIncomeRatio,
      remainingAfterRent
    };
  };

  const results = calculateResults();

  // Clara-friendly status messages
  const getStatusMessage = (value, type) => {
    switch (type) {
      case 'rent':
        if (rentPercentage <= 30) return "You're in the safe zone! 🎉";
        if (rentPercentage <= 40) return "Getting a bit risky, but doable 🤔";
        return "Heads up: this might be too much 🚨";
      case 'disposable':
        if (value >= 500) return "Looking good! 💪";
        if (value >= 200) return "Tight, but manageable 😅";
        return "This might be stretching it 😬";
      default:
        return '';
    }
  };

  const getStatusIconColor = (value, type) => {
    switch (type) {
      case 'rent':
        if (rentPercentage <= 30) return '#2CB853'; // Green
        if (rentPercentage <= 40) return '#FAD75E'; // Yellow
        return '#E16733'; // Orange
      case 'disposable':
        if (value >= 500) return '#2CB853'; // Green
        if (value >= 200) return '#FAD75E'; // Yellow
        return '#E16733'; // Orange
      default:
        return '#12401F';
    }
  };

  const getStatusIcon = (value, type) => {
    switch (type) {
      case 'rent':
        if (rentPercentage <= 30) return 'CheckCircle';
        if (rentPercentage <= 40) return 'AlertTriangle';
        return 'AlertCircle';
      case 'disposable':
        if (value >= 500) return 'CheckCircle';
        if (value >= 200) return 'AlertTriangle';
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="clara-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Calculator" size={20} color="#E16733" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Your Numbers 📊</h2>
          <p className="text-sm text-muted-foreground">Here's what we calculated for you</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Maximum Recommended Rent - Hero Number, Updated text */}
        <div className="clara-card border-2 border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Home" size={20} color="#E16733" />
              <span className="text-sm font-medium text-foreground">This is what you can afford</span>
            </div>
            <Icon name={getStatusIcon(results?.maxRent, 'rent')} 
                  size={16} 
                  color={getStatusIconColor(results?.maxRent, 'rent')} />
          </div>
          <div className="clara-hero-number mb-2">
            ${formatCurrency(results?.maxRent)}
          </div>
          <div className="text-sm font-medium text-foreground mb-1">
            {getStatusMessage(results?.maxRent, 'rent')}
          </div>
          <div className="text-xs text-muted-foreground">
            Based on {rentPercentage}% of your ${formatCurrency(parseInt(monthlyIncome || 0))} income
          </div>
        </div>

        {/* Disposable Income - Hero Number, No Background Color */}
        <div className="clara-card border-2 border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Wallet" size={20} color="#E16733" />
              <span className="text-sm font-medium text-foreground">Money Left Over</span>
            </div>
            <Icon name={getStatusIcon(results?.disposableIncome, 'disposable')} 
                  size={16} 
                  color={getStatusIconColor(results?.disposableIncome, 'disposable')} />
          </div>
          <div className={`clara-hero-number mb-2 ${results?.disposableIncome >= 0 ? 'text-success' : 'text-error'}`}>
            ${formatCurrency(Math.abs(results?.disposableIncome))}
            {results?.disposableIncome < 0 && <span className="text-sm ml-1">(short)</span>}
          </div>
          <div className="text-sm font-medium text-foreground mb-1">
            {results?.disposableIncome >= 0 ? getStatusMessage(results?.disposableIncome, 'disposable') : "Time to adjust something! 🔧"}
          </div>
          <div className="text-xs text-muted-foreground">
            {results?.disposableIncome >= 0 ? 'For fun stuff, savings, and surprises' : 'Consider reducing expenses or increasing income'}
          </div>
        </div>

        {/* Rent Percentage Indicator - Clean White Card */}
        <div className="clara-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Percent" size={18} color="#E16733" />
              <span className="text-sm font-medium text-foreground">Rent vs Income</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {results?.rentToIncomeRatio}%
          </div>
          <div className="text-xs text-muted-foreground">
            Financial experts suggest staying at or below 30%
          </div>
        </div>

        {/* Quick Budget Summary - Clean White Card */}
        {monthlyIncome && nonRentExpenses && (
          <div className="clara-card">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="PieChart" size={16} color="#E16733" className="mr-2" />
              Your Monthly Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Income:</span>
                <span className="font-semibold text-foreground">${formatCurrency(parseInt(monthlyIncome))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Proposed Rent:</span>
                <span className="font-semibold text-foreground">${formatCurrency(results?.maxRent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Other Expenses:</span>
                <span className="font-semibold text-foreground">${formatCurrency(parseInt(nonRentExpenses))}</span>
              </div>
              <div className="border-t border-border pt-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-foreground font-semibold">What's Left:</span>
                  <span className={`font-bold ${results?.disposableIncome >= 0 ? 'text-success' : 'text-error'}`}>
                    ${formatCurrency(Math.abs(results?.disposableIncome))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationResultsPanel;