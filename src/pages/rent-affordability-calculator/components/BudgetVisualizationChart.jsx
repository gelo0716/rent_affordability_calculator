import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Icon from '../../../components/AppIcon';

ChartJS?.register(ArcElement, Tooltip, Legend);

const BudgetVisualizationChart = ({
  monthlyIncome,
  nonRentExpenses,
  rentPercentage
}) => {
  const chartRef = useRef(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const calculateChartData = () => {
    if (!monthlyIncome || !nonRentExpenses) {
      return null;
    }

    const income = parseInt(monthlyIncome);
    const expenses = parseInt(nonRentExpenses);
    const proposedRent = Math.round(income * rentPercentage / 100);
    const remaining = Math.max(0, income - proposedRent - expenses);
    
    return {
      proposedRent,
      expenses,
      remaining: remaining,
      total: income
    };
  };

  const data = calculateChartData();

  const chartData = {
    labels: ['Rent', 'Other Expenses', 'Available Money'],
    datasets: [
      {
        data: data ? [data?.proposedRent, data?.expenses, data?.remaining] : [0, 0, 0],
        backgroundColor: [
          '#E16733', // Clara Orange for Rent
          '#9A4927', // Dark Brown for Expenses  
          '#2CB853', // Clara Green for Savings/Available
        ],
        borderColor: [
          '#E16733',
          '#9A4927', 
          '#2CB853',
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        cutout: '65%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll use custom legend
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context?.raw;
            const percentage = data ? ((value / data?.total) * 100)?.toFixed(1) : '0';
            return `${context?.label}: $${formatCurrency(value)} (${percentage}%)`;
          }
        },
        backgroundColor: '#FFFFFF',titleColor: '#12401F',bodyColor: '#12401F',borderColor: '#E5E5DC',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    onHover: (event, elements) => {
      // Animate slice on hover
      if (chartRef?.current) {
        chartRef.current.canvas.style.cursor = elements?.length > 0 ? 'pointer' : 'default';
      }
    },
  };

  return (
    <div className="clara-card h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="PieChart" size={20} color="#E16733" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Your Budget Breakdown 🥧</h2>
          <p className="text-sm text-muted-foreground">See where your money goes</p>
        </div>
      </div>
      {data ? (
        <>
          {/* Chart Container */}
          <div className="relative h-64 mb-6">
            <Doughnut ref={chartRef} data={chartData} options={options} />
            
            {/* Center Text - Dark Green Hero Number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="clara-hero-number">
                  ${formatCurrency(data?.total)}
                </div>
                <div className="text-sm text-muted-foreground">Total Income</div>
              </div>
            </div>
          </div>

          {/* Custom Legend with Clara 3-Color System */}
          <div className="space-y-3">
            {/* Rent - Orange */}
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#E16733] rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Rent</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  ${formatCurrency(data?.proposedRent)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((data?.proposedRent / data?.total) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Expenses - Dark Brown */}
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#9A4927] rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Other Expenses</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  ${formatCurrency(data?.expenses)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {((data?.expenses / data?.total) * 100)?.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Available Money - Green */}
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#2CB853] rounded-full"></div>
                <span className="text-sm font-medium text-foreground">Available Money</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">
                  ${formatCurrency(data?.remaining)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {data?.remaining > 0 ? ((data?.remaining / data?.total) * 100)?.toFixed(1) : '0.0'}%
                </div>
              </div>
            </div>
          </div>

          {/* Friendly Status Message - Small Icon Only */}
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <Icon name={data?.remaining >= 500 ? "CheckCircle" : data?.remaining >= 200 ? "AlertTriangle" : "AlertCircle"} 
                    size={16} 
                    color={data?.remaining >= 500 ? "#2CB853" : data?.remaining >= 200 ? "#FAD75E" : "#E16733"} />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {data?.remaining >= 500 && "Great job! You've got breathing room! 🌟"}
                  {data?.remaining >= 200 && data?.remaining < 500 && "Not bad, but a bit tight 🤏"}
                  {data?.remaining < 200 && "This might be pushing it 😅"}
                </div>
                <div className="text-xs clara-friendly-text">
                  {data?.remaining >= 500 && "You'll have money left for fun stuff and emergencies."}
                  {data?.remaining >= 200 && data?.remaining < 500 && "Consider if you can trim any expenses."}
                  {data?.remaining < 200 && "Maybe look for a slightly cheaper place or cut some costs?"}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        (<div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mx-auto mb-4">
            <Icon name="PieChart" size={32} color="#6B5B47" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Your Chart Will Appear Here</h3>
          <p className="text-sm clara-friendly-text">
            Fill in your income and expenses above to see the magic happen! ✨
          </p>
        </div>)
      )}
    </div>
  );
};

export default BudgetVisualizationChart;