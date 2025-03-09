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
    specificFeatures: '',
    contactInfo: {
      email: '',
      phone: ''
    }
  };

  // DOM Elements
  const backButton = document.getElementById('back-button');
  const nextButton = document.getElementById('next-button');
  const stepIndicator = document.getElementById('step-indicator');
  const progressText = document.getElementById('progress-text');
  const ageRestrictionMessage = document.getElementById('age-restriction-message');
  const fuelSpendingContainer = document.getElementById('fuel-spending-container');
  const travelFrequencyContainer = document.getElementById('travel-frequency-container');
  const resultsContainer = document.getElementById('results-container');
  const loadingContainer = document.getElementById('loading-container');

  // Form elements
  const ageInput = document.getElementById('age-input');
  const creditScoreSelect = document.getElementById('credit-score-select');
  const monthlyIncomeSelect = document.getElementById('monthly-income-select');
  const spendingCategoryCheckboxes = document.querySelectorAll('.spending-category');
  const fuelSpendingSelect = document.getElementById('fuel-spending-select');
  const travelFrequencySelect = document.getElementById('travel-frequency-select');
  const annualFeeSelect = document.getElementById('annual-fee-select');
  const incomeTypeSelect = document.getElementById('income-type-select');
  const specificFeaturesInput = document.getElementById('specific-features');

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
  });

  incomeTypeSelect.addEventListener('change', function() {
    formData.incomeType = this.value;
  });
  
  specificFeaturesInput.addEventListener('input', function() {
    formData.specificFeatures = this.value;
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
      
      if (currentStep === 5) {
        // Apply fade-out to current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        currentStepElement.classList.add('fade-out');
        
        // Disable the next button during processing
        nextButton.disabled = true;
        nextButton.textContent = 'Processing...';
        
        // Show and activate loading container with delay
        setTimeout(() => {
          // Hide current step after fade out
          currentStepElement.style.display = 'none';
          currentStepElement.classList.remove('fade-out');
          
          // Make sure the results step is visible first
          const resultsStep = document.getElementById('step-6');
          resultsStep.style.display = 'block';
          
          // Reset loading container content to ensure clean state
          const existingAnimationContainer = loadingContainer.querySelector('.loading-animation-container');
          if (existingAnimationContainer) {
            existingAnimationContainer.remove();
          }
          
          // Show loading container
          loadingContainer.style.display = 'block';
          
          // Force a reflow to ensure transitions work properly
          void loadingContainer.offsetWidth;
          
          // Add active class to fade in the loading container
          loadingContainer.classList.add('active');
          
          // Initialize the fancy loading animation
          initFancyLoadingAnimation();
          
          // Get card recommendations
          getCardRecommendations();
        }, 300); // Delay matches the fade-out time
      } else {
        // For regular step transitions
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        currentStepElement.classList.add('fade-out');
        
        // After animation completes, switch steps
        setTimeout(() => {
          // Hide current step
          currentStepElement.style.display = 'none';
          currentStepElement.classList.remove('fade-out');
          
          // Show next step
          currentStep++;
          const nextStepElement = document.getElementById(`step-${currentStep}`);
          nextStepElement.style.display = 'block';
          
          // Trigger reflow
          void nextStepElement.offsetWidth;
          
          // Add fade-in class
          nextStepElement.classList.add('fade-in');
          
          // Update UI elements
          updateUIForCurrentStep();
          
          // Remove animation class after transition
          setTimeout(() => {
            nextStepElement.classList.remove('fade-in');
          }, 300);
        }, 300);
      }
    }
  // UPDATED: handleBack function with proper step visibility, animations, and results clearing
  function handleBack() {
    // Apply fade-out animation to current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    currentStepElement.classList.add('fade-out');
    
    // After animation completes, switch steps
    setTimeout(() => {
      // Hide current step
      currentStepElement.style.display = 'none';
      currentStepElement.classList.remove('fade-out');
      
      // Show previous step
      currentStep--;
      const prevStepElement = document.getElementById(`step-${currentStep}`);
      prevStepElement.style.display = 'block';
      
      // If we're coming back from results page to step 5
      if (currentStep === 5) {
        // Make sure loading container is hidden
        loadingContainer.style.display = 'none';
        loadingContainer.classList.remove('active');
        
        // Clear the results container to prevent showing old results
        resultsContainer.innerHTML = '';
        
        // Reset the next button
        nextButton.disabled = false;
        nextButton.textContent = 'Get Recommendations';
        nextButton.style.display = 'block';
      }
      
      // Trigger reflow
      void prevStepElement.offsetWidth;
      
      // Add fade-in class
      prevStepElement.classList.add('fade-in');
      
      // Update UI elements
      updateUIForCurrentStep();
      
      // Remove animation class after transition
      setTimeout(() => {
        prevStepElement.classList.remove('fade-in');
      }, 300);
    }, 300);
  }

  function updateUIForCurrentStep() {
    // Update step indicator
    if (currentStep < 6) {
      stepIndicator.textContent = `(Step ${currentStep} of 5)`;
      // Calculate progress percentage correctly (20% per step)
      const progressPercentage = Math.round((currentStep / 5) * 100);
      progressText.textContent = `${progressPercentage}% Complete`;
      progressText.style.display = 'block';
      nextButton.style.display = 'block';
      
      // Update progress bar
      document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
      
      if (currentStep === 5) {
        nextButton.textContent = 'Get Recommendations';
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

  // UPDATED: getCardRecommendations function with improved API handling
  async function getCardRecommendations() {
    // Translate form data to descriptive values
    const creditScoreMap = {
      'excellent': 'Excellent (720+)',
      'good': 'Good (680-719)',
      'fair': 'Fair (640-679)',
      'poor': 'Poor (below 640)'
    };
    
    const monthlyIncomeMap = {
      'below25k': 'Below ₹25,000',
      '25k-50k': '₹25,000 - ₹50,000',
      '50k-100k': '₹50,000 - ₹1,00,000',
      'above100k': 'Above ₹1,00,000'
    };
    
    const fuelSpendingMap = {
      'low': 'Low (Below ₹2,000)',
      'medium': 'Medium (₹2,000 - ₹5,000)',
      'high': 'High (Above ₹5,000)'
    };
    
    const travelFrequencyMap = {
      'rare': 'Rarely (0-1 times/year)',
      'occasional': 'Occasionally (2-3 times/year)',
      'frequent': 'Frequently (4+ times/year)'
    };
    
    const annualFeeMap = {
      'no-fee': 'No Annual Fee (Lifetime Free)',
      'low': 'Up to ₹1000',
      'medium': 'Up to ₹2000',
      'high': 'Up to ₹5000',
      'no-restriction': 'No Restriction (I want the best rewards, regardless of fees)'
    };

    // Updated prompt with improved structure and clear instructions
    const prompt = `
    Based on the following user preferences, recommend exactly 3 credit cards available in India. Provide a detailed explanation of why each card is suitable for this user.

    User Profile:
    - Age: ${formData.age}
    - Credit Score: ${creditScoreMap[formData.creditScore] || formData.creditScore}
    - Monthly Income: ${monthlyIncomeMap[formData.monthlyIncome] || formData.monthlyIncome}
    - Spending Categories: ${formData.spendingCategories.length > 0 ? formData.spendingCategories.join(', ') : 'No specific categories selected'}
    ${formData.fuelSpending ? `- Fuel Spending: ${fuelSpendingMap[formData.fuelSpending]}` : ''}
    ${formData.travelFrequency ? `- Travel Frequency: ${travelFrequencyMap[formData.travelFrequency]}` : ''}
    - Annual Fee Preference: ${annualFeeMap[formData.annualFeeRange] || formData.annualFeeRange}
    - Income Type: ${formData.incomeType || 'Not specified'}
    ${formData.specificFeatures ? `- Specific Features Requested: ${formData.specificFeatures}` : ''}

    IMPORTANT INSTRUCTIONS:
    1. Recommend only real Indian credit cards with accurate details.
    2. Provide a genuine suitability score that reflects how well the card matches the user's needs.
    3. For each recommendation, Find an actual or closely similar card image from the web and replace [CARD IMAGE PLACEHOLDER URL] with that image url in the HTML Response.
    4. Do not include any text outside the HTML templates provided below.
    5. Do not include any trailing HTML tags, comments, or explanations after the third card recommendation.

    For each recommended card, provide the response EXACTLY in this HTML format with no deviations:

    <div class="card-recommendation">
      <div class="card-result-header">
        <div class="card-bank-info">
          <img src="[CARD IMAGE PLACEHOLDER URL]" alt="[CARD NAME]" class="card-image">
          <div>
            <p class="card-bank">[BANK NAME]</p>
            <p class="card-name">[CARD NAME]</p>
          </div>
        </div>
        <span class="match-score">[SUITABILITY SCORE]% Match</span>
      </div>
      <div>
        <p>Annual Fee: ₹[ANNUAL FEE]</p>
        <div>
          <h4>Benefits:</h4>
          <ul>
            <li>[BENEFIT 1]</li>
            <li>[BENEFIT 2]</li>
            <li>[BENEFIT 3]</li>
            [REMAINING KEY BENEFITS]
            <li>[BENEFIT N]</li>
          </ul>
        </div>
        <div>
          <h4>Reward Structure:</h4>
          <p>[REWARD DETAILS]</p>
        </div>
        <div>
          <h4>Why this card is for you:</h4>
          <p>[PERSONALIZED EXPLANATION]</p>
        </div>
      </div>
    </div>

    Ensure your response is complete and properly formatted HTML with no additional text, comments, or incomplete tags.
    `;

    try {
      console.log("Sending prompt to OpenAI API:", prompt);
      
      // Start tracking the API call time
      const apiCallStartTime = Date.now();
      
      // Show "Starting request..." in the loading text initially
      const loadingTextElement = loadingContainer.querySelector('.loading-text');
      if (loadingTextElement) {
        loadingTextElement.textContent = "Starting request...";
      }
      
      // Make the actual API call
      const apiCall = fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          "model": "gpt-4o",
          "store": true,
          "messages": [
            {"role": "user", "content": prompt}
          ]
        })
      }).then(response => response.json());
      
      // Set up a timer to update the subtext with time elapsed
      let secondsElapsed = 0;
      let minutes = 0;
      let seconds = 0;
      const loadingSubtextElement = loadingContainer.querySelector('.loading-subtext');
      
      const timeUpdateInterval = setInterval(() => {
        secondsElapsed++;
        if (loadingSubtextElement && secondsElapsed <= 7) {
          loadingSubtextElement.textContent = `Scouring through our database... (${secondsElapsed} seconds)`;
        } 
        else if (loadingSubtextElement && secondsElapsed <= 14) {
          minutes = Math.floor(secondsElapsed / 60);
          seconds = secondsElapsed % 60;
          loadingSubtextElement.textContent = `Matcher Running... (${minutes}m ${seconds}s)`;
        }
        else if (loadingSubtextElement) {
          minutes = Math.floor(secondsElapsed / 60);
          seconds = secondsElapsed % 60;
          loadingSubtextElement.textContent = `Structuring your results... (${minutes}m ${seconds}s)`;
        }
        
      }, 1000);
      
      // Wait for the API response
      const data = await apiCall;
      const recommendations = data.choices[0].message.content;
      
      // Calculate how long the API call took
      const apiCallDuration = Date.now() - apiCallStartTime;
      console.log(`API call took ${apiCallDuration}ms`);
      
      // Clear the time update interval
      clearInterval(timeUpdateInterval);
      
      // No need for extra waiting with 24-27 second API calls
      // Update loading text to show completion
      if (loadingTextElement) {
        loadingTextElement.textContent = "Preparing your recommendations...";
      }
      
      if (loadingSubtextElement) {
        loadingSubtextElement.textContent = "Almost done!";
      }
      
      // Add a short final delay before showing results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hide loading indicator with fade-out effect
      loadingContainer.classList.remove('active');
      
      // After fade-out completes, hide it and show results
      setTimeout(() => {
        loadingContainer.style.display = 'none';
        
        // Display recommendations with sequential animation
        displayCardRecommendations(recommendations);
        
        // Move to the results step
        document.getElementById(`step-${currentStep}`).style.display = 'none';
        currentStep++;
        document.getElementById(`step-${currentStep}`).style.display = 'block';
        updateUIForCurrentStep();
        
        // Re-enable the next button if needed
        nextButton.disabled = false;
      }, 800); // Smooth transition
    } catch (error) {
      console.error("Error getting card recommendations:", error);
      
      // Hide loading indicator with fade-out effect
      loadingContainer.classList.remove('active');
      
      setTimeout(() => {
        loadingContainer.style.display = 'none';
        
        // Show error message
        resultsContainer.innerHTML = `
          <div class="error-message">
            <h3 class="error-title">Sorry, something went wrong</h3>
            <p class="error-text">We couldn't retrieve your card recommendations at this time. Please try again later.</p>
          </div>
        `;
        
        // Move to the results step
        document.getElementById(`step-${currentStep}`).style.display = 'none';
        currentStep++;
        document.getElementById(`step-${currentStep}`).style.display = 'block';
        updateUIForCurrentStep();
        
        // Re-enable the next button if needed
        nextButton.disabled = false;
      }, 800);
    }
  }
  function displayCardRecommendations(html) {
    // First, clear any existing content
    resultsContainer.innerHTML = '';
    
    // Create a temporary container to hold the HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    
    // Clean up any trailing HTML or text
    const cardElements = tempContainer.querySelectorAll('.card-recommendation');
    
    // If we found card recommendations, add them sequentially with animations
    if (cardElements.length > 0) {
      // Process each card with a delay between them
      cardElements.forEach((card, index) => {
        // Hide the card initially
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Add to the DOM
        resultsContainer.appendChild(card);
        
        // Set up image fallbacks
        const cardImage = card.querySelector('.card-image');
        if (cardImage) {
          cardImage.onerror = function() {
            this.src = "../images/credit-card-logo.svg";
          };
        }
        
        // Show the card with a delay based on its position
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          
          // Highlight the benefits with a subtle animation
          const benefits = card.querySelectorAll('ul li');
          benefits.forEach((benefit, benefitIndex) => {
            benefit.style.opacity = '0';
            benefit.style.transform = 'translateX(10px)';
            benefit.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
              benefit.style.opacity = '1';
              benefit.style.transform = 'translateX(0)';
            }, 300 + benefitIndex * 150); // Stagger benefit animations
          });
          
        }, 500 + index * 800); // Show each card with an 800ms delay after the previous one
      });
    } else {
      // If no cards were found, just show the raw HTML
      resultsContainer.innerHTML = html;
      
      // Setup image fallbacks
      setupImageFallbacks();
    }
  }

  function initFancyLoadingAnimation() {
    console.log("Initializing fancy loading animation");
    
    // Ensure Three.js is available
    if (typeof THREE === 'undefined') {
      console.log("THREE.js not available, loading dynamically");
      
      // Load Three.js dynamically
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = function() {
        console.log("THREE.js loaded dynamically");
        setTimeout(() => {
          setupLoadingAnimation();
        }, 50);
      };
      document.head.appendChild(script);
    } else {
      console.log("THREE.js already available");
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        setupLoadingAnimation();
      }, 50);
    }
  }

  // Setup the 3D loading animation

  // Updated setupLoadingAnimation function with larger size and slower speed
  // Updated setupLoadingAnimation function optimized for long duration (24-27 seconds)

  function setupLoadingAnimation() {
    console.log("Setting up loading animation for longer duration");
    
    try {
      // Create a container for the animation
      const animContainer = document.createElement('div');
      animContainer.className = 'loading-animation-container';
      animContainer.style.position = 'relative';
      animContainer.style.width = '100%';
      animContainer.style.height = '200px';
      animContainer.style.display = 'flex';
      animContainer.style.justifyContent = 'center';
      animContainer.style.alignItems = 'center';
      
      // Insert it as the first child of the loading container
      loadingContainer.prepend(animContainer);
      
      // Add fancy-active class to use specialized styles
      loadingContainer.classList.add('fancy-active');
      
      // Create wrapper element
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.width = '200px';
      wrapper.style.height = '200px';
      wrapper.style.overflow = 'hidden';
      animContainer.appendChild(wrapper);
      
      // Set up variables 
      const canvassize = 200;
      const length = 40;
      const radius = 7.5;
      const rotatevalue = 0.012; // Extremely slow rotation for longer duration
      
      let acceleration = 0;
      let animatestep = 0;
      let toend = false;
      
      const pi2 = Math.PI * 2;
      
      // Set up Three.js objects
      const camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
      camera.position.z = 200;
      
      const scene = new THREE.Scene();
      const group = new THREE.Group();
      scene.add(group);
      
      // Create custom curve with more complexity for longer interest
      class CustomSinCurve extends THREE.Curve {
        constructor(scale = 1) {
          super();
          this.scale = scale;
        }
        
        getPoint(t) {
          const x = length * Math.sin(pi2 * t);
          const y = radius * Math.cos(pi2 * 3 * t);
          
          let z, tt;
          tt = t % 0.25 / 0.25;
          tt = t % 0.25 - (2 * (1 - tt) * tt * -0.0185 + tt * tt * 0.25);
          
          if (Math.floor(t / 0.25) == 0 || Math.floor(t / 0.25) == 2) {
            tt *= -1;
          }
          
          z = radius * Math.sin(pi2 * 2 * (t - tt));
          
          return new THREE.Vector3(x, y, z).multiplyScalar(this.scale);
        }
      }
      
      // Create the tube mesh
      const path = new CustomSinCurve(1);
      const tubeGeometry = new THREE.TubeGeometry(path, 200, 1.5, 8, true);
      
      // Use GREEN color
      const mesh = new THREE.Mesh(
        tubeGeometry,
        new THREE.MeshBasicMaterial({
          color: 0x22c55e,
          transparent: true,
          opacity: 1
        })
      );
      group.add(mesh);
      
      // Create the ring cover
      const ringcover = new THREE.Mesh(
        new THREE.PlaneGeometry(65, 20, 1),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          opacity: 0,
          transparent: true
        })
      );
      ringcover.position.x = length + 1;
      ringcover.rotation.y = Math.PI / 2;
      group.add(ringcover);
      
      // Create the ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(5.7, 7.3, 32),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          opacity: 0,
          transparent: true
        })
      );
      ring.position.x = length + 1.1;
      ring.rotation.y = Math.PI / 2;
      group.add(ring);
      
      // Create fake shadow
      (function() {
        for (let i = 0; i < 10; i++) {
          const plain = new THREE.Mesh(
            new THREE.PlaneGeometry(length * 2 + 1, radius * 3, 1),
            new THREE.MeshBasicMaterial({
              color: 0x22c55e,
              transparent: true,
              opacity: 0.13
            })
          );
          plain.position.z = -3.3 + i * 0.65;
          group.add(plain);
        }
      })();
      
      // Set up renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvassize, canvassize);
      renderer.setClearColor('#ffffff');
      
      // Position canvas in the center
      const canvas = renderer.domElement;
      canvas.style.position = 'absolute';
      canvas.style.left = '50%';
      canvas.style.top = '50%';
      canvas.style.width = `${canvassize}px`;
      canvas.style.height = `${canvassize}px`;
      canvas.style.margin = `-${canvassize/2}px 0 0 -${canvassize/2}px`;
      
      // Add canvas to wrapper
      wrapper.appendChild(canvas);
      
      // Animation control variables
      let autoProgressionTimer = null;
      let isAnimating = true;
      let cycleComplete = false;
      let cycleCount = 0;
      const maxCycles = 3; // Allow multiple cycles for long duration
      
      // Add loading text updater for longer waits
      const loadingTexts = [
        "Finding your perfect cards...",
        "Analyzing your preferences...",
        "Matching with top card offers...",
        "Calculating benefit scores...",
        "Almost there..."
      ];
      
      let currentTextIndex = 0;
      const loadingTextElement = loadingContainer.querySelector('.loading-text');
      
      // Update loading text periodically
      const textUpdateInterval = setInterval(() => {
        if (loadingContainer.style.display !== 'none') {
          currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
          if (loadingTextElement) {
            // Fade out
            loadingTextElement.style.opacity = '0';
            setTimeout(() => {
              // Change text
              loadingTextElement.textContent = loadingTexts[currentTextIndex];
              // Fade in
              loadingTextElement.style.opacity = '1';
            }, 300);
          }
        } else {
          clearInterval(textUpdateInterval);
        }
      }, 4500); // Change text every 4.5 seconds
      
      // Easing function
      function easing(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
      
      // Much slower render function designed for 24-27 second duration
      function render() {
        let progress;
        
        // Extremely slow animation progression - designed for long API calls
        const stepIncrement = 0.08; // Drastically reduced for 24-27 second duration
        
        if (cycleComplete && cycleCount < maxCycles) {
          // Reset for another cycle
          animatestep = 0;
          cycleComplete = false;
          cycleCount++;
        }
        
        animatestep = Math.max(0, Math.min(240, toend ? animatestep + stepIncrement : animatestep - 1));
        acceleration = easing(animatestep, 0, 1, 240);
        
        if (acceleration > 0.35) {
          progress = (acceleration - 0.35) / 0.65;
          group.rotation.y = -Math.PI / 2 * progress;
          group.position.z = 67 * progress;
          progress = Math.max(0, (acceleration - 0.97) / 0.03);
          mesh.material.opacity = 1 - progress;
          ringcover.material.opacity = ring.material.opacity = progress;
          ring.scale.x = ring.scale.y = 0.9 + 0.1 * progress;
          
          // Check if cycle complete
          if (progress >= 0.99) {
            cycleComplete = true;
          }
        }
        
        renderer.render(scene, camera);
      }
      
      // Start auto-progression after a delay
      autoProgressionTimer = setTimeout(() => {
        toend = true;
      }, 1000); // Longer initial delay
      
      // Animation loop
      function animate() {
        if (isAnimating) {
          mesh.rotation.x += rotatevalue + acceleration * 0.3; // Even slower rotation
          render();
          requestAnimationFrame(animate);
        }
      }
      
      // Start animation
      animate();
      
      // Keep animation running until explicitly stopped
      const checkVisibility = setInterval(() => {
        if (loadingContainer.style.display === 'none') {
          isAnimating = false;
          clearInterval(checkVisibility);
          clearInterval(textUpdateInterval);
          clearTimeout(autoProgressionTimer);
        }
      }, 200);
      
    } catch (error) {
      console.error("Error in setupLoadingAnimation:", error);
    }
  }
  // NEW: Clean up trailing HTML content
  function cleanupTrailingHTML() {
    // Get all card recommendation elements
    const cardElements = resultsContainer.querySelectorAll('.card-recommendation');
    
    // If we have card recommendations, keep only those and remove anything else
    if (cardElements.length > 0) {
      const fragment = document.createDocumentFragment();
      cardElements.forEach(card => fragment.appendChild(card.cloneNode(true)));
      
      // Clear the container and append only the cards
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(fragment);
    }
  }
  
  // Handle image fallbacks with custom bank colors

  function setupImageFallbacks() {
        const cardImages = document.querySelectorAll('.card-image');
        
        cardImages.forEach(img => {
          img.onerror = function() {
            // Extract bank name from alt text or parent elements
  
            this.src = "../images/credit-card-logo.svg";
          };
        });
      }
});