import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/Footer';
import IncomeInputSection from './components/IncomeInputSection';
import RentSliderSection from './components/RentSliderSection';
import CalculationResultsPanel from './components/CalculationResultsPanel';
import RentersGuide from './components/RentersGuide';
import SkeletonLoader from '../../components/ui/SkeletonLoader';
import Icon from '../../components/AppIcon';

const RentAffordabilityCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [nonRentExpenses, setNonRentExpenses] = useState('');
  const [monthlyDebt, setMonthlyDebt] = useState(''); // New State for Debt
  const [rentPercentage, setRentPercentage] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  // Mock Firebase Anonymous Authentication
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);

      // Simulate Firebase initialization and data loading
      setTimeout(() => {
        // Mock loading saved data from localStorage (simulating Firestore)
        const savedData = localStorage.getItem('rentCalculatorData');
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            setMonthlyIncome(parsedData?.monthlyIncome || '');
            setNonRentExpenses(parsedData?.nonRentExpenses || '');
            setMonthlyDebt(parsedData?.monthlyDebt || '');
            setRentPercentage(parsedData?.rentPercentage || 30);
          } catch (error) {
            console.log('Error loading saved data:', error);
          }
        }
        setIsLoading(false);
      }, 1000);
    };

    initializeApp();
  }, []);

  // Mock Firestore data persistence
  useEffect(() => {
    if (!isLoading && (monthlyIncome || nonRentExpenses || monthlyDebt || rentPercentage !== 30)) {
      const dataToSave = {
        monthlyIncome,
        nonRentExpenses,
        monthlyDebt,
        rentPercentage,
        lastUpdated: new Date()?.toISOString()
      };

      // Simulate saving to Firestore with localStorage
      localStorage.setItem('rentCalculatorData', JSON.stringify(dataToSave));
    }
  }, [monthlyIncome, nonRentExpenses, monthlyDebt, rentPercentage, isLoading]);

  // Handle Start House Hunting button click
  const handleStartHouseHunting = () => {
    window.open('https://www.rentwithclara.com/portable-rental-application', '_blank');
  };

  // Schema.org structured data
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://rent-affordability-calculator.rentwithclara.com';
  
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/#article`,
        "headline": "How Much Rent Can I Afford?",
        "description": "Complete guide to calculating affordable rent using the 30% rule, 50/30/20 budget split, and understanding hidden rental costs. Includes interactive rent calculator.",
        "image": `${siteUrl}/og-image.jpg`,
        "author": {
          "@type": "Organization",
          "name": "Rent with Clara",
          "url": "https://rentwithclara.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Rent with Clara",
          "logo": {
            "@type": "ImageObject",
            "url": "https://rentwithclara.com/logo.png"
          }
        },
        "datePublished": "2025-10-25",
        "dateModified": "2025-10-25",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${siteUrl}/`
        },
        "articleSection": "Personal Finance",
        "keywords": "rent affordability, rent calculator, 30% rule, rental budget, how much rent can I afford, rent to income ratio",
        "about": [
          {
            "@type": "Thing",
            "name": "Rent Affordability"
          },
          {
            "@type": "Thing",
            "name": "Personal Budgeting"
          },
          {
            "@type": "Thing",
            "name": "Rental Housing"
          }]

      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the 30% rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Spend no more than 30% of gross monthly income on rent. Keeps other expenses manageable."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate affordable rent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gross monthly income × 0.30 = baseline rent budget. Adjust based on debt and goals."
            }
          },
          {
            "@type": "Question",
            "name": "What costs beyond rent should I budget?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Utilities ($100-$250), internet ($50-$150), renter's insurance ($15-$40), parking (varies). Add $150-$400 monthly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I negotiate rent?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Research comparable units, highlight stable income, offer longer lease or upfront payments."
            }
          },
          {
            "@type": "Question",
            "name": "How can I lower rental costs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Get a roommate, search farther from downtown, choose smaller units, time your search for winter months."
            }
          },
          {
            "@type": "Question",
            "name": "Why get renter\'s insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Protects your belongings and provides liability coverage. Costs $15-$40/month. Landlord's policy doesn't cover your stuff."
            }
          },
          {
            "@type": "Question",
            "name": "Should I pay more for better location?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calculate total costs. Higher rent near work might save on car, gas, and commute time. Run the full numbers."
            }
          },
          {
            "@type": "Question",
            "name": "What if 30% doesn't work in my city?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Get a roommate, move farther out, or increase income with side work. High-cost cities require creative solutions."
            }
          }
        ]

      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#calculator`,
        "name": "Rent Affordability Calculator",
        "description": "Free online calculator to determine how much rent you can afford based on your income and expenses using the 30% rule and 50/30/20 budget framework.",
        "url": `${siteUrl}/`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate affordable rent based on income",
          "Apply 30% rule automatically",
          "Factor in debt payments",
          "Personalized rent budget recommendations"],

        "browserRequirements": "Requires JavaScript",
        "creator": {
          "@type": "Organization",
          "name": "Rent with Clara"
        }
      },
      {
        "@type": "HowTo",
        "@id": `${siteUrl}/#howto`,
        "name": "How to Calculate Affordable Rent",
        "description": "Step-by-step guide to determining how much rent you can afford using proven budgeting methods.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Use the calculator",
            "text": "Use the Rent with Clara calculator above for your personalized range"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add hidden costs",
            "text": "Add 20% for utilities and hidden costs"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "List requirements",
            "text": "List your must-haves (location, size, pet policy)"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Search within budget",
            "text": "Search within your calculated ceiling"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Visit properties",
            "text": "Visit properties at different times (rush hour, evening, weekend)"
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Review lease",
            "text": "Read lease carefully"
          },
          {
            "@type": "HowToStep",
            "position": 7,
            "name": "Document condition",
            "text": "Document everything at move-in"
          }]

      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rentwithclara.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Rent Calculator",
            "item": `${siteUrl}/`
          }]

      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        "url": `${siteUrl}/`,
        "name": "Rent Affordability Calculator - How Much Rent Can I Afford? | Rent with Clara",
        "description": "Calculate how much rent you can afford with our free calculator. Learn the 30% rule, budget strategies, and hidden costs to find your perfect rental.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Rent with Clara",
          "url": "https://rentwithclara.com/"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${siteUrl}/og-image.jpg`
        },
        "breadcrumb": {
          "@id": `${siteUrl}/#breadcrumb`
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "h2", ".faq"]
        }
      }]

  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SkeletonLoader />
      </div>);
  }

  return (
    <>
      <Helmet>
        <title>Rent Affordability Calculator - How Much Rent Can I Afford? | Rent with Clara</title>
        <meta name="description" content="Calculate how much rent you can afford with our free calculator. Learn the 30% rule, budget strategies, and hidden costs to find your perfect rental." />
        <meta name="keywords" content="rent affordability, rent calculator, 30% rule, rental budget, how much rent can I afford, rent to income ratio" />
        <meta property="og:title" content="Rent Affordability Calculator - How Much Rent Can I Afford? | Rent with Clara" />
        <meta property="og:description" content="Calculate how much rent you can afford with our free calculator. Learn the 30% rule, budget strategies, and hidden costs to find your perfect rental." />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rent Affordability Calculator - How Much Rent Can I Afford? | Rent with Clara" />
        <meta name="twitter:description" content="Calculate how much rent you can afford with our free calculator. Learn the 30% rule, budget strategies, and hidden costs to find your perfect rental." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        <link rel="canonical" href={`${siteUrl}/`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section - Updated with new copy */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6">
              <Icon name="Calculator" size={32} color="#E16733" className="hidden" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-[rgba(78,42,31,1)]">Rent Affordability Calculator</h1>
            <p className="text-xl clara-friendly-text max-w-3xl mx-auto leading-relaxed">
              Finding a new home starts with knowing your budget. Our Rent Affordability Calculator gives you a clear, reliable estimate based on your income and expenses. No complicated formulas, just a straightforward answer to help you search with confidence.
            </p>

            {/* Trust Indicators - Small Icons Only */}
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="#2CB853" />
                <span>Your data is safe with us</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} color="#E16733" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Heart" size={16} color="#E16733" />
                <span>Made to help you succeed</span>
              </div>
            </div>
          </div>

          {/* Simplified Calculator Grid - Only Left=Inputs, Right=Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Input Controls */}
            <div className="lg:col-span-1 space-y-6">
              <IncomeInputSection
                monthlyIncome={monthlyIncome}
                setMonthlyIncome={setMonthlyIncome}
                nonRentExpenses={nonRentExpenses}
                setNonRentExpenses={setNonRentExpenses}
                monthlyDebt={monthlyDebt}
                setMonthlyDebt={setMonthlyDebt}
              />

              <RentSliderSection
                rentPercentage={rentPercentage}
                setRentPercentage={setRentPercentage}
                monthlyIncome={monthlyIncome} />
            </div>

            {/* Right Column - Results (Your Numbers) */}
            <div className="lg:col-span-1 space-y-6">
              <CalculationResultsPanel
                monthlyIncome={monthlyIncome}
                nonRentExpenses={nonRentExpenses}
                monthlyDebt={monthlyDebt}
                rentPercentage={rentPercentage} />
            </div>
          </div>

          {/* New Renter Profile CTA Section - "You Are More Than Your Income" */}
          <div className="mb-12">
            <div className="clara-card text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6">
                <Icon name="User" size={32} color="#E16733" />
              </div>
              <h3 className="text-3xl font-bold mb-6 text-foreground">You Are More Than Your Income</h3>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Landlords often focus on income, but that's only part of your story. Your financial responsibility, rental history, and overall profile matter just as much. A strong application shows landlords you're a reliable and trustworthy renter.
              </p>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                At Clara, we help you build a comprehensive renter profile that highlights your strengths and helps you make a great first impression.
              </p>
              <button
                className="clara-cta mb-4"
                onClick={handleStartHouseHunting}>
                Create Your Renter Profile Today
              </button>
              <p className="text-sm text-muted-foreground">
                Ready to find your next home? Use the calculator to find your budget, then create your free Clara Renter Profile to show landlords why you're the right choice.
              </p>
            </div>
          </div>

          {/* Renters Guide (Collapsible) */}
          <RentersGuide />

          {/* Footer Information - Clara Friendly */}
          <div className="clara-card">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-xl mx-auto mb-4">
                <Icon name="Info" size={24} color="#FAD75E" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Just a Friendly Heads Up!</h3>
              <p className="text-sm clara-friendly-text max-w-4xl mx-auto leading-relaxed">
                Think of this as your helpful budgeting buddy, not your financial advisor! While we use
                industry-standard guidelines, every situation is unique. Your actual rental approval depends
                on your credit score, job history, and what your landlord is looking for. Always double-check
                with real financial pros and trust your gut when making big housing decisions. You've got this! 🌟
              </p>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} color="#E16733" />
                    <span>Updated: October {new Date()?.getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} color="#E16733" />
                    <span>US Market Guidelines</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="DollarSign" size={14} color="#E16733" />
                    <span>All amounts in USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default RentAffordabilityCalculator;
