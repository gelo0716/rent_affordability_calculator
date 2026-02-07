import React from 'react';
import Icon from '../../../components/AppIcon';

const AdvancedInsights = ({ results, monthlyIncome }) => {
  const { rentToIncomeRatio, disposableIncome } = results;
  
  // Calculate "Landlord Approval Score" (0-100)
  const calculateScore = () => {
    let score = 50; // Base score

    // Rent Ratio Impact
    if (rentToIncomeRatio <= 25) score += 30;
    else if (rentToIncomeRatio <= 30) score += 20;
    else if (rentToIncomeRatio <= 35) score += 10;
    else if (rentToIncomeRatio > 40) score -= 10;

    // Disposable Income Impact
    if (disposableIncome >= 1000) score += 20;
    else if (disposableIncome >= 500) score += 10;
    else if (disposableIncome < 200) score -= 10;

    // Cap score
    return Math.min(Math.max(score, 0), 100);
  };

  const score = calculateScore();

  // Get Score Interpretation
  const getScoreDetails = (score) => {
    if (score >= 80) return { 
      label: "Excellent Applicant 🌟", 
      color: "text-success", 
      bg: "bg-success",
      desc: "Landlords will likely approve your application immediately."
    };
    if (score >= 60) return { 
      label: "Strong Applicant ✅", 
      color: "text-primary", 
      bg: "bg-primary",
      desc: "You meet most criteria. Having a good credit score will seal the deal."
    };
    return { 
      label: "Risky Applicant ⚠️", 
      color: "text-error", 
      bg: "bg-error",
      desc: "You might need a guarantor or a higher security deposit."
    };
  };

  const details = getScoreDetails(score);

  return (
    <div className="clara-card border-2 border-primary/20 bg-primary/5 relative overflow-hidden mt-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Award" size={24} color="#E16733" />
          <h3 className="text-lg font-bold text-foreground">Pro Insights Unlocked</h3>
        </div>

        {/* Score Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* Gauge Visualization (Simple CSS Circle) */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-border"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={`${(score / 100) * 351} 351`}
                className={`${details.color} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-bold ${details.color}`}>{score}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Score</span>
            </div>
          </div>

          {/* Text Details */}
          <div className="flex-1 text-center md:text-left">
            <h4 className={`text-xl font-bold mb-1 ${details.color}`}>{details.label}</h4>
            <p className="text-sm text-foreground mb-3">{details.desc}</p>
            
            <div className="bg-background rounded-lg p-3 border border-border">
              <div className="flex items-start space-x-2">
                <Icon name="Zap" size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Competitive Edge: </span>
                  {rentToIncomeRatio <= 30 
                    ? "Your rent-to-income ratio is under 30%, which puts you ahead of 65% of other applicants."
                    : "Your ratio is slightly high. Offer to sign a longer lease to improve approval odds."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-3 bg-background p-3 rounded-lg border border-border">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="Check" size={16} className="text-success" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-foreground">Income Verified</p>
              <p className="text-muted-foreground">Ready for application</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-background p-3 rounded-lg border border-border">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="FileText" size={16} className="text-primary" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-foreground">Rent Resume</p>
              <p className="text-muted-foreground">Generated & Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedInsights;
