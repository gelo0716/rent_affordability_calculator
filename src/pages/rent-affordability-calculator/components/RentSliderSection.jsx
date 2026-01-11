import React from 'react';
import Icon from '../../../components/AppIcon';

const RentSliderSection = ({ 
  rentPercentage, 
  setRentPercentage, 
  monthlyIncome 
}) => {
  const handleSliderChange = (e) => {
    setRentPercentage(parseInt(e?.target?.value));
  };

  const calculateRentAmount = () => {
    if (!monthlyIncome) return 0;
    return Math.round((parseInt(monthlyIncome) * rentPercentage) / 100);
  };

  const getSliderColor = () => {
    if (rentPercentage <= 30) return 'bg-success';
    if (rentPercentage <= 40) return 'bg-warning';
    return 'bg-error';
  };

  const getRecommendationText = () => {
    if (rentPercentage <= 30) return 'Excellent - Within recommended range';
    if (rentPercentage <= 40) return 'Moderate - Consider reducing if possible';
    return 'High - May strain your budget';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="Percent" size={20} color="#ffb470" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#4e2a1f]">Rent Percentage</h2>
          <p className="text-sm text-muted-foreground">Adjust your desired rent-to-income ratio</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-foreground">
              Percentage of Income for Rent
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">{rentPercentage}%</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="range"
              min="10"
              max="60"
              value={rentPercentage}
              onChange={handleSliderChange}
              className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, var(--color-success) 0%, var(--color-success) 30%, var(--color-warning) 30%, var(--color-warning) 40%, var(--color-error) 40%, var(--color-error) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>10%</span>
              <span className="text-success">30% (Recommended)</span>
              <span>60%</span>
            </div>
          </div>
        </div>

        {monthlyIncome && (
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Estimated Monthly Rent:</span>
                <span className="text-xl font-bold text-primary">
                  ${formatCurrency(calculateRentAmount())}
                </span>
              </div>
              <div className={`flex items-center space-x-2 text-sm ${
                rentPercentage <= 30 ? 'text-success' : 
                rentPercentage <= 40 ? 'text-warning' : 'text-error'
              }`}>
                <Icon 
                  name={rentPercentage <= 30 ? 'CheckCircle' : rentPercentage <= 40 ? 'AlertTriangle' : 'XCircle'} 
                  size={16} 
                  color={rentPercentage <= 30 ? 'var(--color-success)' : 
                         rentPercentage <= 40 ? 'var(--color-warning)' : 'var(--color-error)'}
                />
                <span>{getRecommendationText()}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-success/10 rounded-lg p-3 border border-success/20">
                <div className="text-xs text-success font-medium mb-1">Conservative</div>
                <div className="text-sm font-semibold text-foreground">≤30%</div>
              </div>
              <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
                <div className="text-xs text-warning font-medium mb-1">Moderate</div>
                <div className="text-sm font-semibold text-foreground">31-40%</div>
              </div>
              <div className="bg-error/10 rounded-lg p-3 border border-error/20">
                <div className="text-xs text-error font-medium mb-1">High Risk</div>
                <div className="text-sm font-semibold text-foreground">&gt;40%</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default RentSliderSection;