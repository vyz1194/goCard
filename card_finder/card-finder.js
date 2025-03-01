document.addEventListener('DOMContentLoaded', function() {
  // State management
  let currentStep = 1;
  let showIneligibleMessage = false;
  
  const formData = {
    age: '',
    creditScore: '',
    monthlyIncome: '',
    spendingCategories: [],
    fuelSpending: '',
    travelFrequency: '',
    annualFeeRange: '',
    incomeType: '',
    annualFeePreference: false,
    contactInfo: {
      email: '',
      phone: ''
    }
  };

  // Credit cards data - expanded with more options
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
      name: "Coral",
      bank: "ICICI Bank",
      category: "Economy/ Basic",
      features: ["2 reward points per Rs. 100"],
      annualFee: 0,
      rewardRate: 4,
      pointsPerSpend: 2/100,
      fuelBenefits: false,
      minIncome: 500000,
      creditScoreNeeded: "good",
      eligibleIncomeTypes: ["salaried", "self-employed"],
      ageRange: { min: 21, max: 60 }
    },
    {
      name: "Amazon Pay",
      bank: "ICICI Bank",
      category: "Economy/ Basic",
      features: ["5% cashback on Amazon"],
      annualFee: 0,
      rewardRate: 1,
      pointsPerSpend: null,
      fuelBenefits: false,
      minIncome: 300000,
      creditScoreNeeded: "good",
      eligibleIncomeTypes: ["salaried", "self-employed"],
      ageRange: { min: 21, max: 60 }
    },
    {
      name: "Ace",
      bank: "Axis Bank",
      category: "Economy/ Basic",
      features: ["5% cashback"],
      annualFee: 499,
      rewardRate: 1,
      pointsPerSpend: null,
      fuelBenefits: false,
      minIncome: 300000,
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
      name: "Indian Oil RBL Bank XTRA Credit Card",
      bank: "RBL Bank",
      category: "Fuel rewards",
      features: ["Welcome benefit of 3000 fuel points"],
      annualFee: 0,
      rewardRate: 2,
      pointsPerSpend: null,
      fuelBenefits: true,
      minIncome: 300000,
      creditScoreNeeded: "good",
      eligibleIncomeTypes: ["salaried", "self-employed"],
      ageRange: { min: 21, max: 60 }
    },
    {
      name: "BPCL SBI Card Octane",
      bank: "SBI",
      category: "Fuel rewards",
      features: ["Welcome benefit of 6000 reward points"],
      annualFee: 0,
      rewardRate: 4,
      pointsPerSpend: null,
      fuelBenefits: true,
      minIncome: 300000,
      creditScoreNeeded: "good",
      eligibleIncomeTypes: ["salaried", "self-employed"],
      ageRange: { min: 21, max: 60 }
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
    },
    {
      name: "Atlas Credit card",
      bank: "Axis Bank",
      category: "Travel Rewards",
      features: ["Welcome benefit of 2500 EDGE Miles"],
      annualFee: 5000,
      rewardRate: 1,
      pointsPerSpend: null,
      fuelBenefits: false,
      minIncome: 500000,
      creditScoreNeeded: "excellent",
      eligibleIncomeTypes: ["salaried", "self-employed"],
      ageRange: { min: 21, max: 60 }
    },
    {
      name: "American Express Platinum Travel Card",
      bank: "American Express",
      category: "Travel Rewards",
      features: ["Complimentary domestic lounge access", "Bonus Membership Rewards points"],
      annualFee: 3500,
      rewardRate: 2,
      pointsPerSpend: null,
      fuelBenefits: false,
      minIncome: 600000,
      creditScoreNeeded: "excellent",
      eligibleIncomeTypes: ["salaried"],
      ageRange: { min: 21, max: 60 }
    },
    {
      name: "HDFC Marriott Bonvoy Credit Card",
      bank: "HDFC Bank",
      category: "Hotel Rewards",
      features: ["Complimentary Marriott Bonvoy Silver Elite Status", "Bonus Marriott Bonvoy points"],
      annualFee: 3000,
      rewardRate: 3,
      pointsPerSpend: null,
      fuelBenefits: false,
      minIncome: 500000,
      creditScoreNeeded: "excellent",
      eligibleIncomeTypes: ["salaried", "self-employed"],
      ageRange: { min: 21, max: 60 }
    }
  ];

  // DOM Elements
  const backButton = document.getElementById('back-button');
  const nextButton = document.getElementById('next-button');
  const stepIndicator = document.getElementById('step-indicator');
  const progressText = document.getElementById('progress-text');
  const ageRestrictionMessage = document.getElementById('age-restriction-message');
  const fuelSpendingContainer = document.getElementById('fuel-spending-container');
  const travelFrequencyContainer = document.getElementById('travel-frequency-container');
  const resultsContainer = document.getElementById('results-container');

  // Form elements
  const ageInput = document.getElementById('age-input');
  const creditScoreSelect = document.getElementById('credit-score-select');
  const monthlyIncomeSelect = document.getElementById('monthly-income-select');
  const spendingCategoryCheckboxes = document.querySelectorAll('.spending-category');
  const fuelSpendingSelect = document.getElementById('fuel-spending-select');
  const travelFrequencySelect = document.getElementById('travel-frequency-select');
  const annualFeeSelect = document.getElementById('annual-fee-select');
  const incomeTypeSelect = document.getElementById('income-type-select');

  // Initialize event listeners
  backButton.addEventListener('click', handleBack);
  nextButton.addEventListener('click', handleNext);
  
  // Spending categories listeners
  spendingCategoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleSpendingCategoryChange);
  });

  // Form input listeners
  ageInput.addEventListener('input', function() {
    formData.age = this.value;
  });

  creditScoreSelect.addEventListener('change', function() {
    formData.creditScore = this.value;
  });

  monthlyIncomeSelect.addEventListener('change', function() {
    formData.monthlyIncome = this.value;
  });

  fuelSpendingSelect.addEventListener('change', function() {
    formData.fuelSpending = this.value;
  });

  travelFrequencySelect.addEventListener('change', function() {
    formData.travelFrequency = this.value;
  });

  annualFeeSelect.addEventListener('change', function() {
    formData.annualFeeRange = this.value;
    // Set annual fee preference based on selection
    if (this.value === 'no-fee' || this.value === 'low') {
      formData.annualFeePreference = false;
    } else {
      formData.annualFeePreference = true;
    }
  });

  incomeTypeSelect.addEventListener('change', function() {
    formData.incomeType = this.value;
  });

  // Event handlers
  function handleSpendingCategoryChange(e) {
    const category = e.target.value;
    
    if (e.target.checked) {
      if (!formData.spendingCategories.includes(category)) {
        formData.spendingCategories.push(category);
      }
    } else {
      formData.spendingCategories = formData.spendingCategories.filter(c => c !== category);
    }
    
    // Show/hide conditional fields
    updateConditionalFields();
  }

  function updateConditionalFields() {
    if (formData.spendingCategories.includes('fuel')) {
      fuelSpendingContainer.style.display = 'block';
    } else {
      fuelSpendingContainer.style.display = 'none';
      formData.fuelSpending = '';
    }
    
    if (formData.spendingCategories.includes('travel')) {
      travelFrequencyContainer.style.display = 'block';
    } else {
      travelFrequencyContainer.style.display = 'none';
      formData.travelFrequency = '';
    }
  }

  function handleNext() {
    if (currentStep === 1) {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 18) {
        ageRestrictionMessage.style.display = 'block';
        showIneligibleMessage = true;
        return;
      } else {
        ageRestrictionMessage.style.display = 'none';
        showIneligibleMessage = false;
      }
    }
    
    if (currentStep === 4) {
      // Process recommendations
      processRecommendations();
    }

    // Hide current step
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    
    // Show next step
    currentStep++;
    document.getElementById(`step-${currentStep}`).style.display = 'block';
    
    // Update UI elements
    updateUIForCurrentStep();
  }

  function handleBack() {
    // Hide current step
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    
    // Show previous step
    currentStep--;
    document.getElementById(`step-${currentStep}`).style.display = 'block';
    
    // Update UI elements
    updateUIForCurrentStep();
  }

  function updateUIForCurrentStep() {
    // Update step indicator
    if (currentStep < 5) {
      stepIndicator.textContent = `(Step ${currentStep} of 4)`;
      progressText.textContent = `${Math.round((currentStep / 4) * 100)}% Complete`;
      progressText.style.display = 'block';
      nextButton.style.display = 'block';
      
      // Update progress bar
      document.getElementById('progress-fill').style.width = `${Math.round((currentStep / 4) * 100)}%`;
      
      if (currentStep === 4) {
        nextButton.textContent = 'See Recommendations';
      } else {
        nextButton.textContent = 'Next';
      }
    } else {
      stepIndicator.textContent = '';
      progressText.style.display = 'none';
      nextButton.style.display = 'none';
    }
    
    // Show/hide back button
    if (currentStep > 1) {
      backButton.style.display = 'inline-block';
    } else {
      backButton.style.display = 'none';
    }
  }

  function calculateMatch(card) {
    let score = 0;
    let disqualified = false;
    
    // Basic eligibility checks - these are disqualifiers
    const age = parseInt(formData.age);
    if (age < card.ageRange.min || age > card.ageRange.max) {
      return 0; // Age disqualifies the card
    }

    // Credit score check - strict requirement
    const creditScoreRanking = {
      'excellent': 4,
      'good': 3,
      'fair': 2,
      'poor': 1
    };
    
    const userCreditScore = creditScoreRanking[formData.creditScore] || 0;
    const requiredCreditScore = creditScoreRanking[card.creditScoreNeeded] || 0;
    
    if (userCreditScore < requiredCreditScore) {
      return 0; // Credit score disqualifies the card
    }
    
    // Income check - strict requirement
    const incomeMap = {
      'below25k': 25000,
      '25k-50k': 50000,
      '50k-100k': 100000,
      'above100k': 150000
    };
    
    const userIncome = incomeMap[formData.monthlyIncome] || 0;
    if (card.minIncome && userIncome < card.minIncome) {
      return 0; // Income disqualifies the card
    }
    
    // Income type check - strict requirement
    if (formData.incomeType && 
        card.eligibleIncomeTypes && 
        !card.eligibleIncomeTypes.includes(formData.incomeType)) {
      return 0; // Income type disqualifies the card
    }
    
    // Annual fee check
    const feeRanges = {
      'no-fee': 0,
      'low': 1000,
      'medium': 5000,
      'high': Infinity
    };
    
    if (formData.annualFeeRange && card.annualFee > feeRanges[formData.annualFeeRange]) {
      return 0; // Annual fee disqualifies the card
    }

    // If we've made it this far, the card is at least basically eligible
    // Now calculate match score based on preferences
    
    // Base score - all eligible cards start with 40 points
    score += 40;

    // Category match (up to 30 points)
    // If user selected fuel as a category, fuel cards get a big boost
    if (formData.spendingCategories.includes('fuel') && 
        (card.category === 'Fuel rewards' || card.fuelBenefits)) {
      score += 30;
    } 
    // If user selected travel as a category, travel cards get a big boost
    else if (formData.spendingCategories.includes('travel') && 
             (card.category === 'Travel Rewards' || card.category === 'Hotel Rewards')) {
      score += 30;
    }
    // If user selected shopping, shopping-oriented cards get a boost
    else if (formData.spendingCategories.includes('shopping') && 
             card.name.includes('Amazon') || card.name.includes('Flipkart')) {
      score += 25;
    }
    // For general spending categories, basic cards are fine
    else if (formData.spendingCategories.length > 0 && card.category === 'Economy/ Basic') {
      score += 15;
    }

    // Reward rate (up to 15 points)
    if (card.rewardRate >= 4) score += 15;
    else if (card.rewardRate >= 2) score += 10;
    else if (card.rewardRate > 0) score += 5;

    // Annual fee preference (up to 15 points)
    if ((!formData.annualFeePreference && card.annualFee <= 500) || 
        (formData.annualFeePreference && card.annualFee > 500)) {
      score += 15;
    }

    // Specific fuel spending preference (up to 10 points)
    if (formData.spendingCategories.includes('fuel') && card.fuelBenefits) {
      if (formData.fuelSpending === 'high') score += 10;
      else if (formData.fuelSpending === 'medium') score += 7;
      else if (formData.fuelSpending === 'low') score += 3;
    }

    // Travel frequency preference (up to 10 points)
    if (formData.spendingCategories.includes('travel') && 
        (card.category === 'Travel Rewards' || card.category === 'Hotel Rewards')) {
      if (formData.travelFrequency === 'frequent') score += 10;
      else if (formData.travelFrequency === 'occasional') score += 5;
      else if (formData.travelFrequency === 'rare') score += 2;
    }

    return Math.min(100, Math.round(score));
  }

  function processRecommendations() {
    const scoredCards = creditCards.map(card => {
      const score = calculateMatch(card);
      return {
        ...card,
        matchScore: score
      };
    });
    
    // Only include cards with a positive match score
    const eligibleCards = scoredCards.filter(card => card.matchScore > 0);
    
    // Special case: if user selected only fuel category, prioritize fuel cards
    if (formData.spendingCategories.length === 1 && formData.spendingCategories[0] === 'fuel') {
      const fuelCards = eligibleCards.filter(card => 
        card.category === 'Fuel rewards' || card.fuelBenefits
      ).sort((a, b) => b.matchScore - a.matchScore);
      
      if (fuelCards.length > 0) {
        displayResults(fuelCards.slice(0, 3));
        return;
      }
    }
    
    // Special case: if user selected only travel category, prioritize travel cards
    if (formData.spendingCategories.length === 1 && formData.spendingCategories[0] === 'travel') {
      const travelCards = eligibleCards.filter(card => 
        card.category === 'Travel Rewards' || card.category === 'Hotel Rewards'
      ).sort((a, b) => b.matchScore - a.matchScore);
      
      if (travelCards.length > 0) {
        displayResults(travelCards.slice(0, 3));
        return;
      }
    }
    
    // General case: sort by match score and take top 3
    const recommendedCards = eligibleCards
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
    
    displayResults(recommendedCards);
  }

  function displayResults(matches) {
    resultsContainer.innerHTML = '';
    
    if (!matches || matches.length === 0) {
      const noMatchesDiv = document.createElement('div');
      noMatchesDiv.className = 'error-message';
      noMatchesDiv.innerHTML = `
        <p>We couldn't find any cards that match your criteria at the moment. Would you like us to notify you when new cards become available?</p>
        <div class="form-group">
          <label class="form-label" for="notification-email">Email</label>
          <input type="email" id="notification-email" class="form-input" placeholder="Enter your email">
        </div>
        <div class="form-group">
          <label class="form-label" for="notification-phone">Phone (Optional)</label>
          <input type="tel" id="notification-phone" class="form-input" placeholder="Enter your phone number">
        </div>
        <button id="notify-button" class="notify-button">Notify Me</button>
      `;
      
      resultsContainer.appendChild(noMatchesDiv);
      
      // Add event listener for notify button
      document.getElementById('notify-button').addEventListener('click', function() {
        const email = document.getElementById('notification-email').value;
        const phone = document.getElementById('notification-phone').value;
        
        formData.contactInfo.email = email;
        formData.contactInfo.phone = phone;
        
        alert('Thank you! We\'ll notify you when new cards match your criteria.');
      });
    } else {
      matches.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-result';
        
        cardElement.innerHTML = `
          <div class="card-result-header">
            <div class="card-bank-info">
              <img src="https://via.placeholder.com/100x60" alt="${card.bank} ${card.name}" class="card-image">
              <div>
                <p class="card-bank">${card.bank}</p>
                <p class="card-name">${card.name}</p>
              </div>
            </div>
            <span class="match-score">${card.matchScore}% Match</span>
          </div>
          <div>
            <p>Category: ${card.category}</p>
            <p>Annual Fee: ₹${card.annualFee}</p>
            <div>
              <p>Key Features:</p>
              <ul>
                ${card.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            ${card.rewardRate ? `
              <div>
                <p>Reward Rate: ${card.rewardRate}:1</p>
                ${card.pointsPerSpend ? `<p>Points per ₹100: ${Math.round(card.pointsPerSpend * 100)}</p>` : ''}
              </div>
            ` : ''}
          </div>
        `;
        
        resultsContainer.appendChild(cardElement);
      });
    }
  }
});