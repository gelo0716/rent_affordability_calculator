import React from 'react';
import Icon from '../../../components/AppIcon';

const FinancialAdviceSection = ({ 
  monthlyIncome, 
  nonRentExpenses, 
  rentPercentage, 
  isPremiumUnlocked, 
  onUnlockRequest 
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US')?.format(value);
  };

  const generateAdvice = () => {
    if (!monthlyIncome || !nonRentExpenses) {
      return [];
    }

    const income = parseInt(monthlyIncome);
    const expenses = parseInt(nonRentExpenses);
    const currentRent = Math.round(income * rentPercentage / 100);
    const disposableIncome = income - currentRent - expenses;

    const advice = [];

    // Emergency Fund Advice
    advice?.push({
      category: 'Emergency Fund',
      icon: 'Shield',
      title: 'Your Safety Net Strategy 🛡️',
      content: disposableIncome > 300 
        ? `Great news! With $${formatCurrency(disposableIncome)} left over each month, you can build a solid emergency fund. Try saving $${formatCurrency(Math.min(300, Math.round(disposableIncome * 0.5)))} monthly - you'll have 3 months of expenses saved in no time!` : `Money's tight with only $${formatCurrency(disposableIncome)} left over. Start small - even $25/month adds up! Look for ways to trim expenses so you can build that crucial safety net.`,
      priority: 1
    });

    // Savings Strategy
    advice?.push({
      category: 'Savings Strategy',
      icon: 'PiggyBank',
      title: 'Growing Your Money Tree 🌱',
      content: income > 5000
        ? `As a higher earner, you should aim to save 20% of your income ($${formatCurrency(Math.round(income * 0.2))}). Consider maxing out retirement accounts and looking into index fund investing.`
        : `Start with the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Even if you can't hit 20% yet, start with whatever you can manage. Every dollar saved is a dollar working for your future!`,
      priority: 2
    });

    // Rent Optimization
    if (rentPercentage > 30) {
      advice?.push({
        category: 'Rent Optimization',
        icon: 'Home',
        title: 'Getting Your Housing Costs Right 🏠',
        content: `At ${rentPercentage}% of income, housing is eating too much of your budget. Try to find places around $${formatCurrency(Math.round(income * 0.3))} (30% rule). Consider roommates, slightly longer commutes, or negotiating with your current landlord.`,
        priority: 1
      });
    } else {
      advice?.push({
        category: 'Rent Optimization',
        icon: 'Home', 
        title: 'Housing Win! 🏠',
        content: `You're crushing it at ${rentPercentage}%! This smart housing choice leaves room for other financial goals. Just make sure you're not sacrificing too much quality of life for savings.`,
        priority: 3
      });
    }

    // Credit Building
    advice?.push({
      category: 'Credit Building',
      icon: 'CreditCard',
      title: 'Building Your Credit Score 📈',
      content: `Strong credit = better rent deals and loan rates. Pay all bills on time, keep credit card balances low (under 30% of limit), and check your credit report annually. Good credit can save you thousands over time!`,
      priority: 2
    });

    // Income Growth
    advice?.push({
      category: 'Income Growth',
      icon: 'TrendingUp',
      title: 'Boosting Your Earning Power 💪',
      content: income < 4000
        ? `At $${formatCurrency(income)}/month, growing your income could be game-changing. Consider skill development, side hustles, or asking for a raise. Even an extra $500/month would dramatically improve your financial picture.`
        : `You're in good shape income-wise! Focus on advancing in your career, building valuable skills, and maybe exploring passive income streams. The key is making your money work harder, not just working harder for money.`,
      priority: 2
    });

    return advice?.sort((a, b) => a?.priority - b?.priority)?.slice(0, 4);
  };

  const adviceItems = generateAdvice();

  const getCategoryColor = (category) => {
    const colors = {
      'Emergency Fund': '#2CB853',
      'Savings Strategy': '#BBACF9',
      'Rent Optimization': '#E16733',
      'Credit Building': '#FAD75E',
      'Income Growth': '#2CB853'
    };
    return colors?.[category] || '#E16733';
  };

  if (!isPremiumUnlocked) {
    return (
      <div className="relative">
        {/* Blurred Preview */}
        <div className="filter blur-sm pointer-events-none">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center">
              <Icon name="Lightbulb" size={24} color="#E16733" className="mr-3" />
              Expert Financial Coaching
            </h2>
            <p className="text-muted-foreground">Personalized strategies to improve your financial health</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="clara-card">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg flex-shrink-0">
                    <Icon name="Shield" size={20} color="#2CB853" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-success font-semibold mb-1">EMERGENCY FUND</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Your Safety Net Strategy 🛡️</h3>
                    <p className="text-sm text-muted-foreground">
                      Building an emergency fund is crucial for financial stability. Start with small amounts and gradually increase your savings rate...
                    </p>
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
              <Icon name="GraduationCap" size={24} color="#E16733" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Get Expert Financial Coaching! 🎓</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Unlock personalized strategies from financial experts to improve your money game.
            </p>
            <button 
              onClick={onUnlockRequest}
              className="clara-cta flex items-center space-x-2 mx-auto"
            >
              <Icon name="Unlock" size={18} color="white" />
              <span>Get My Financial Coaching</span>
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
          <Icon name="Lightbulb" size={24} color="#E16733" className="mr-3" />
          Your Financial Coach Says... 🎓
        </h2>
        <p className="text-muted-foreground">Expert strategies tailored to your situation</p>
      </div>
      {adviceItems?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adviceItems?.map((item, index) => (
            <div key={index} className="clara-card hover:shadow-elevated transition-all">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name={item?.icon} size={20} color={getCategoryColor(item?.category)} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold mb-1" style={{ color: getCategoryColor(item?.category) }}>
                    {item?.category?.toUpperCase()}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{item?.title}</h3>
                  <p className="text-sm clara-friendly-text leading-relaxed">
                    {item?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="clara-card text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mx-auto mb-4">
            <Icon name="Lightbulb" size={32} color="#6B5B47" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Your Coaching Awaits!</h3>
          <p className="text-sm clara-friendly-text">
            Enter your income and expenses to get personalized financial advice from the pros! 💡
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancialAdviceSection;