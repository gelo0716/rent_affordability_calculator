import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import UpfrontCostsEstimation from './UpfrontCostsEstimation';
import AdvancedInsights from './AdvancedInsights';
import EmailCaptureModal from './EmailCaptureModal';
import { emailService } from '../../../services/emailService';

const CalculationResultsPanel = ({
  monthlyIncome,
  nonRentExpenses,
  monthlyDebt,
  rentPercentage
}) => {
  const panelRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    try {
      const storedEmail = localStorage.getItem('rentCalculator_userEmail');
      if (storedEmail && emailService?.validateEmail(storedEmail)) {
        setIsProUnlocked(true);
      }
    } catch {
    }
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const handleDownloadPdf = async () => {
    if (!panelRef.current) return;

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(panelRef.current, {
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.setFontSize(16);
      pdf.text('Rent Affordability Report', 105, 15, { align: 'center' });
      pdf.setFontSize(10);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });

      pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight);
      pdf.save('rent-with-clara-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const calculateResults = () => {
    if (!monthlyIncome) {
      return {
        maxRent: 0,
        disposableIncome: 0,
        rentToIncomeRatio: 0,
        remainingAfterRent: 0
      };
    }

    const income = parseInt(monthlyIncome) || 0;
    const expenses = parseInt(nonRentExpenses) || 0;
    const debt = parseInt(monthlyDebt) || 0;

    const maxRent = Math.round(income * rentPercentage / 100);
    const totalCommitted = maxRent + expenses + debt;
    const disposableIncome = income - totalCommitted;
    const rentToIncomeRatio = rentPercentage;

    return {
      maxRent,
      disposableIncome,
      rentToIncomeRatio,
      totalCommitted
    };
  };

  const results = calculateResults();

  // Chart Data Preparation
  const chartData = [
    { name: 'Rent', value: results.maxRent, color: '#E16733' },
    { name: 'Debt', value: parseInt(monthlyDebt) || 0, color: '#DC2626' },
    { name: 'Expenses', value: parseInt(nonRentExpenses) || 0, color: '#FAD75E' },
    { name: 'Remaining', value: Math.max(0, results.disposableIncome), color: '#2CB853' }
  ].filter(item => item.value > 0);

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
    <div className="clara-card" ref={panelRef}>
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
        {/* Maximum Recommended Rent - Hero Number */}
        <div className="clara-card border-2 border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Home" size={20} color="#E16733" />
              <span className="text-sm font-medium text-foreground">Max Recommended Rent</span>
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

        {/* Disposable Income - Hero Number */}
        <div className="clara-card border-2 border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Wallet" size={20} color="#E16733" />
              <span className="text-sm font-medium text-foreground">Leftover for Savings/Fun</span>
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
            {results?.disposableIncome >= 0 ? 'Great job budgeting!' : 'Consider reducing expenses or increasing income'}
          </div>
        </div>

        {/* Visual Budget Breakdown - Pie Chart */}
        {monthlyIncome && (
          <div className="clara-card">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center">
              <Icon name="PieChart" size={16} color="#E16733" className="mr-2" />
              Where Your Money Goes
            </h3>

            <div className="h-[200px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `$${formatCurrency(value)}`}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              {/* Detailed text breakdown if needed, or rely on Legend + Tooltip */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Income</span>
                <span className="font-semibold">${formatCurrency(parseInt(monthlyIncome))}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <UpfrontCostsEstimation monthlyRent={results.maxRent} />

      {/* Advanced Insights Section (Locked/Unlocked) */}
      {monthlyIncome && (
        <>
          {!isProUnlocked ? (
            <div className="clara-card bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 mt-6 relative overflow-hidden group hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => setShowEmailModal(true)}>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                    <Icon name="Lock" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Unlock Your Approval Score</h3>
                    <p className="text-xs text-muted-foreground">See how landlords view your application</p>
                  </div>
                </div>
                <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm group-hover:scale-105 transition-transform">
                  FREE
                </div>
              </div>
            </div>
          ) : (
            <AdvancedInsights results={results} monthlyIncome={monthlyIncome} />
          )}
        </>
      )}

      {/* PDF Download Button */}
      {monthlyIncome && (
        <div className="mt-6 pt-4 border-t border-border flex justify-center">
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isGeneratingPdf ? (
              <span className="animate-spin mr-2">⏳</span>
            ) : (
              <Icon name="Download" size={16} color="#E16733" />
            )}
            <span>{isGeneratingPdf ? 'Generating Report...' : 'Download My Report'}</span>
          </button>
        </div>
      )}

      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={() => setIsProUnlocked(true)}
        sessionData={{
          monthly_income: parseInt(monthlyIncome || 0),
          non_rent_expenses: parseInt(nonRentExpenses || 0),
          monthly_debt: parseInt(monthlyDebt || 0),
          rent_percentage: rentPercentage
        }}
      />
    </div>
  );
};

export default CalculationResultsPanel;
