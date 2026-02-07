import React, { useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import UpfrontCostsEstimation from './UpfrontCostsEstimation';
import AdvancedInsights from './AdvancedInsights';
import EmailCaptureModal from './EmailCaptureModal';

const CalculationResultsPanel = ({
  monthlyIncome,
  nonRentExpenses,
  rentPercentage
}) => {
  const panelRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isProUnlocked, setIsProUnlocked] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

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
          rent_percentage: rentPercentage
        }}
      />
    </div>
  );
};

export default CalculationResultsPanel;