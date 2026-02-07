import React from 'react';
import Icon from '../../../components/AppIcon';

const UpfrontCostsEstimation = ({ monthlyRent }) => {
  if (!monthlyRent) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const costs = {
    firstMonth: monthlyRent,
    securityDeposit: monthlyRent,
    applicationFees: 150, // Average for app + admin fees
    movingEssentials: 400 // Truck rental, boxes, supplies
  };

  const totalUpfront = Object.values(costs).reduce((a, b) => a + b, 0);

  return (
    <div className="mt-8 pt-6 border-t-2 border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="Package" size={20} color="#E16733" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Move-In Cash Needed 🚚</h2>
          <p className="text-sm text-muted-foreground">Estimated cash to save before day 1</p>
        </div>
      </div>

      <div className="bg-secondary/20 rounded-xl p-5 border border-secondary/50">
        {/* Total Hero Number */}
        <div className="flex justify-between items-end mb-4">
            <div>
                <div className="text-sm text-muted-foreground mb-1">Estimated Total</div>
                <div className="text-2xl font-bold text-primary">
                    ${formatCurrency(totalUpfront)}
                </div>
            </div>
            {/* Optional: Add a small badge or visual here */}
        </div>

        {/* Breakdown List */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">First Month's Rent</span>
            <span className="font-medium text-foreground">${formatCurrency(costs.firstMonth)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Security Deposit</span>
            <span className="font-medium text-foreground">${formatCurrency(costs.securityDeposit)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">App & Admin Fees</span>
            <span className="font-medium text-foreground">${formatCurrency(costs.applicationFees)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Moving Crew/Truck</span>
            <span className="font-medium text-foreground">${formatCurrency(costs.movingEssentials)}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start space-x-2 text-xs text-muted-foreground">
        <Icon name="Info" size={14} className="mt-0.5 shrink-0" color="#E16733" />
        <span>
            Most landlords require a cashier's check for the rent and deposit upon lease signing.
        </span>
      </div>
    </div>
  );
};

export default UpfrontCostsEstimation;
