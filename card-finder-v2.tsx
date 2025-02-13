import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const creditCards = [
  {
    name: "SimplySAVE",
    bank: "SBI",
    category: "Economy/ Basic",
    features: ["Welcome Benefit of 2000 reward points"],
    annualFee: 499,
    rewardRate: 4,
    pointsPerSpend: 10/150,
    fuelBenefits: true,
    minIncome: 20000,
    creditScoreNeeded: "good",
    eligibleIncomeTypes: ["salaried", "self-employed"],
    ageRange: { min: 21, max: 60 }
  },
  {
    name: "MoneyBack+",
    bank: "HDFC Bank",
    category: "Economy/ Basic",
    features: ["Welcome Benefit of 500 reward points"],
    annualFee: 500,
    rewardRate: 4,
    pointsPerSpend: 20/150,
    fuelBenefits: false,
    minIncome: 600000,
    creditScoreNeeded: "good",
    eligibleIncomeTypes: ["salaried", "self-employed"],
    ageRange: { min: 21, max: 60 }
  },
  {
    name: "Flipkart Super Elite",
    bank: "Axis Bank",
    category: "Economy/ Basic",
    features: ["Welcome benefit of 500 SuperCoins", "Extra discounts on Flipkart"],
    annualFee: 500,
    rewardRate: 1,
    pointsPerSpend: 16/100,
    fuelBenefits: false,
    minIncome: 300000,
    creditScoreNeeded: "good",
    eligibleIncomeTypes: ["salaried", "self-employed"],
    ageRange: { min: 18, max: 70 }
  },
  {
    name: "IndianOil Axis Bank",
    bank: "Axis Bank",
    category: "Fuel rewards",
    features: ["Welcome benefit of 1250 EDGE reward points"],
    annualFee: 500,
    rewardRate: 5,
    pointsPerSpend: null,
    fuelBenefits: true,
    minIncome: 300000,
    creditScoreNeeded: "good",
    eligibleIncomeTypes: ["salaried", "self-employed"],
    ageRange: { min: 18, max: 70 }
  }
];

const CardFinder = () => {
  const [step, setStep] = useState(1);
  const [showIneligibleMessage, setShowIneligibleMessage] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    creditScore: '',
    monthlyIncome: '',
    spendingCategories: [],
    fuelSpending: '',
    travelFrequency: '',
    annualFeeRange: '',
    incomeType: '',
    contactInfo: { email: '', phone: '' }
  });
  const [results, setResults] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateMatch = (card) => {
    let score = 0;
    const age = parseInt(formData.age);
    if (age < card.ageRange.min || age > card.ageRange.max) return 0;

    const feeRanges = {
      'no-fee': 0,
      'low': 1000,
      'medium': 5000,
      'high': Infinity
    };
    
    if (formData.annualFeeRange && card.annualFee > feeRanges[formData.annualFeeRange]) {
      return 0;
    }

    score += 40;

    const categoryScore = formData.spendingCategories.reduce((acc, category) => {
      if (category === 'fuel' && card.fuelBenefits) acc += 10;
      if (category === 'travel' && card.category.includes('Travel')) acc += 10;
      return acc;
    }, 0);
    score += Math.min(30, categoryScore);

    if (formData.spendingCategories.includes('travel')) {
      if (formData.travelFrequency === 'frequent' && card.category.includes('Travel')) score += 10;
      else if (formData.travelFrequency === 'occasional' && card.category.includes('Travel')) score += 5;
    }

    if (formData.spendingCategories.includes('fuel') && card.fuelBenefits) {
      if (formData.fuelSpending === 'high') score += 10;
      else if (formData.fuelSpending === 'medium') score += 5;
    }

    if (card.rewardRate >= 4) score += 10;
    else if (card.rewardRate >= 2) score += 5;

    return Math.min(100, Math.round(score));
  };

  const handleNext = () => {
    if (step === 1) {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 18) {
        setShowIneligibleMessage(true);
        return;
      }
    }
    
    if (step === 4) {
      const matches = creditCards
        .map(card => ({
          ...card,
          matchScore: calculateMatch(card)
        }))
        .filter(card => card.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);
      
      setResults(matches);
    }

    setShowIneligibleMessage(false);
    setStep(prev => prev + 1);
  };

  const renderProgressBar = () => (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{Math.min(100, Math.round((step / 4) * 100))}% Complete</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${Math.min(100, (step / 4) * 100)}%` }}
        />
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
      {showIneligibleMessage ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-semibold text-red-800">Age Restriction Notice</h3>
          <p className="text-red-700">We apologize, but credit cards are only available to individuals 18 years and older.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-gray-600">Age</label>
            <input
              type="number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Credit Score Range</label>
            <select 
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              value={formData.creditScore}
              onChange={(e) => handleInputChange('creditScore', e.target.value)}
            >
              <option value="">Select credit score</option>
              <option value="excellent">Excellent (720+)</option>
              <option value="good">Good (680-719)</option>
              <option value="fair">Fair (640-679)</option>
              <option value="poor">Poor (below 640)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Monthly Income</label>
            <select 
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              value={formData.monthlyIncome}
              onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
            >
              <option value="">Select income range</option>
              <option value="below25k">Below ₹25,000</option>
              <option value="25k-50k">₹25,000 - ₹50,000</option>
              <option value="50k-100k">₹50,000 - ₹1,00,000</option>
              <option value="above100k">Above ₹1,00,000</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );

  const renderSpendingPreferences = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Spending Preferences</h2>
      <div className="space-y-6">
        <div>
          <label className="block mb-4 text-gray-600">Select your top spending categories</label>
          <div className="grid grid-cols-2 gap-4">
            {['shopping', 'travel', 'fuel', 'dining', 'groceries', 'entertainment'].map(category => (
              <label key={category} className="flex items-center p-3 space-x-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                  checked={formData.spendingCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange('spendingCategories', [...formData.spendingCategories, category]);
                    } else {
                      handleInputChange('spendingCategories', 
                        formData.spendingCategories.filter(cat => cat !== category)
                      );
                    }
                  }}
                />
                <span className="text-gray-700 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {formData.spendingCategories.includes('fuel') && (
          <div>
            <label className="block mb-2 text-gray-600">Monthly Fuel Spending</label>
            <select 
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              value={formData.fuelSpending}
              onChange={(e) => handleInputChange('fuelSpending', e.target.value)}
            >
              <option value="">Select fuel spending</option>
              <option value="low">Low (Below ₹2,000)</option>
              <option value="medium">Medium (₹2,000 - ₹5,000)</option>
              <option value="high">High (Above ₹5,000)</option>
            </select>
          </div>
        )}

        {formData.spendingCategories.includes('travel') && (
          <div>
            <label className="block mb-2 text-gray-600">How often do you travel?</label>
            <select 
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              value={formData.travelFrequency}
              onChange={(e) => handleInputChange('travelFrequency', e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="rare">Rarely (0-1 times/year)</option>
              <option value="occasional">Occasionally (2-3 times/year)</option>
              <option value="frequent">Frequently (4+ times/year)</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnnualFee = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Annual Fee Preference</h2>
      <div>
        <label className="block mb-2 text-gray-600">Maximum Annual Fee You're Willing to Pay</label>
        <select 
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          value={formData.annualFeeRange}
          onChange={(e) => handleInputChange('annualFeeRange', e.target.value)}
        >
          <option value="">Select fee range</option>
          <option value="no-fee">No Annual Fee</option>
          <option value="low">Up to ₹1,000</option>
          <option value="medium">₹1,000 - ₹5,000</option>
          <option value="high">Above ₹5,000</option>
        </select>
      </div>
    </div>
  );

  const renderIncomeType = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Income Type</h2>
      <div>
        <label className="block mb-2 text-gray-600">What type of income do you have?</label>
        <select 
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          value={formData.incomeType}
          onChange={(e) => handleInputChange('incomeType', e.target.value)}
        >
          <option value="">Select income type</option>
          <option value="salaried">Salaried</option>
          <option value="self-employed">Self-employed</option>
          <option value="business">Business Owner</option>
        </select>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Recommended Cards</h2>
      {(!results || results.length === 0) ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-gray-600 mb-6">We couldn't find any cards that match your criteria.</p>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo', {...formData
