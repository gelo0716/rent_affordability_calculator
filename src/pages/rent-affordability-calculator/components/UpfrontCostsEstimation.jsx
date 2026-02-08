import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const UpfrontCostsEstimation = ({ monthlyRent }) => {
  const rent = Number(monthlyRent) || 0;

  const [costs, setCosts] = useState(() => ({
    firstMonth: rent,
    securityDeposit: rent,
    applicationFees: 150,
    movingEssentials: 400
  }));

  // Update rent-dependent costs when rent changes
  useEffect(() => {
    if (!rent) return;
    setCosts(prev => ({
      ...prev,
      firstMonth: rent,
      securityDeposit: rent
    }));
  }, [rent]);

  const handleCostChange = (key, value) => {
    const numericValue = parseInt(value?.replace(/[^0-9]/g, '') || 0);
    setCosts(prev => ({
      ...prev,
      [key]: numericValue
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  if (!rent) return null;

  const totalUpfront = Object.values(costs).reduce((a, b) => a + b, 0);

  return (
    <div className="mt-8 pt-6 border-t-2 border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Package" size={20} color="#E16733" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Move-In Cash Needed 🚚</h2>
          <p className="text-sm text-muted-foreground">Estimated cash to save before day 1 (Editable)</p>
        </div>
      </div>

      <div className="bg-secondary/20 rounded-xl p-5 border border-secondary/50">
        {/* Total Hero Number */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Estimated Total</div>
            <div className="text-2xl font-bold text-primary">
              ${formatCurrency(totalUpfront)}
            </div>
          </div>
        </div>

        {/* Breakdown List - Editable */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm text-muted-foreground">First Month's Rent</label>
            <div className="text-right font-medium text-foreground">${formatCurrency(costs.firstMonth)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm text-muted-foreground">Security Deposit</label>
            <div className="text-right font-medium text-foreground">${formatCurrency(costs.securityDeposit)}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm text-muted-foreground">App & Admin Fees</label>
            <Input
              type="text"
              value={formatCurrency(costs.applicationFees)}
              onChange={(e) => handleCostChange('applicationFees', e.target.value)}
              className="text-right h-8 py-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-sm text-muted-foreground">Moving Crew/Truck</label>
            <Input
              type="text"
              value={formatCurrency(costs.movingEssentials)}
              onChange={(e) => handleCostChange('movingEssentials', e.target.value)}
              className="text-right h-8 py-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start space-x-2 text-xs text-muted-foreground">
        <Icon name="Info" size={14} className="mt-0.5 shrink-0" color="#E16733" />
        <span>
          Customizable estimates. Most landlords require a cashier's check for the rent and deposit.
        </span>
      </div>
    </div>
  );
};

export default UpfrontCostsEstimation;
