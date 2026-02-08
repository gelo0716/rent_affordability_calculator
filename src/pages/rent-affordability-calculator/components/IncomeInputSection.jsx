import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const IncomeInputSection = ({
  monthlyIncome,
  setMonthlyIncome,
  nonRentExpenses,
  setNonRentExpenses,
  monthlyDebt,
  setMonthlyDebt
}) => {
  const handleIncomeChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9]/g, '');
    setMonthlyIncome(value);
  };

  const handleExpensesChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9]/g, '');
    setNonRentExpenses(value);
  };

  const handleDebtChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9]/g, '');
    setMonthlyDebt(value);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const totalExpenses = (parseInt(nonRentExpenses) || 0) + (parseInt(monthlyDebt) || 0);
  const remainingIncome = (parseInt(monthlyIncome) || 0) - totalExpenses;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="DollarSign" size={20} color="#ffb470" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#4e2a1f]">Financial Information</h2>
          <p className="text-sm text-muted-foreground">Enter your monthly income and expenses</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            label="Monthly After-Tax Income"
            type="text"
            placeholder="5,000"
            value={formatCurrency(monthlyIncome)}
            onChange={handleIncomeChange}
            description="Your take-home pay after taxes and deductions"
            className="text-lg" />

          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} color="#ffb470" className="mr-1" />
            <span>Include salary, freelance income, and other regular earnings</span>
          </div>
        </div>

        <div>
          <Input
            label="Monthly Debt Payments"
            type="text"
            placeholder="500"
            value={formatCurrency(monthlyDebt)}
            onChange={handleDebtChange}
            description="Credit cards, student loans, car payments, etc."
            className="text-lg" />
        </div>

        <div>
          <Input
            label="Other Monthly Expenses"
            type="text"
            placeholder="1,500"
            value={formatCurrency(nonRentExpenses)}
            onChange={handleExpensesChange}
            description="Food, utilities, transportation, subscriptions, etc."
            className="text-lg" />
        </div>

        {monthlyIncome && (nonRentExpenses || monthlyDebt) &&
          <div className="bg-secondary/50 rounded-lg p-4 border border-secondary">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary-foreground">Available for Rent & Savings:</span>
              <span className="text-lg font-semibold text-primary">
                ${formatCurrency(Math.max(0, remainingIncome))}
              </span>
            </div>
          </div>
        }
      </div>
    </div>);
};

export default IncomeInputSection;