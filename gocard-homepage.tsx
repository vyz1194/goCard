import React, { useState } from 'react';
import { CreditCard, Award, ArrowRight, MessageSquare } from 'lucide-react';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [enquiryNumber, setEnquiryNumber] = useState(1);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare email data
    const emailData = {
      to: ['vyz1194@gmail.com', 'adithyananandmenon@gmail.com'],
      cc: [formData.email],
      subject: `Enquiry@GoCard #${enquiryNumber.toString().padStart(4, '0')}`,
      body: `
        New enquiry from GoCard website:
        
        Enquiry Number: ${enquiryNumber}
        Name: ${formData.name}
        Email: ${formData.email}
        
        Message:
        ${formData.message}
      `
    };

    try {
      // Here you would integrate with your email sending service
      // For example, using your backend API endpoint
      // const response = await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(emailData)
      // });

      // For now, we'll simulate a successful submission
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });
      
      // Increment enquiry number
      setEnquiryNumber(prev => prev + 1);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Replace with your hosted logo URL */}
            <img 
              src="/api/placeholder/200/100" 
              alt="GoCard Logo" 
              className="h-12 object-contain"
            />
            <h1 className="text-2xl font-bold text-green-600">GoCard</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-gradient-to-b from-white to-green-100 pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 font-sans">
              Choose Smarter, Earn Better with GoCard
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Empowering you to choose credit cards that fit your life, not the other way around. 
              We simplify rewards, demystify fees, and turn financial jargon into actionable choices.
            </p>
            <a 
              href="https://claude.site/artifacts/17d779cd-5144-4ceb-a328-75dbdc50f797"
              className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-semibold flex items-center hover:bg-green-600 transition-colors"
            >
              Find Your Perfect Card
              <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl shadow-lg bg-white">
              <CreditCard className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Choose Your Card</h3>
              <p className="text-gray-600">
                No more guesswork. Answer a few questions, and we'll match you with cards 
                tailored to your spending habits, credit score, and goals.
              </p>
            </div>
            <div className="p-8 rounded-xl shadow-lg bg-white">
              <Award className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Maximize Your Rewards</h3>
              <p className="text-gray-600">
                Turn points into experiences. We'll show you how to redeem rewards for travel, 
                cashback, or even debt reduction—no PhD in fine print required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Tell Us About You',
                description: '60-second quiz on your spending and goals.'
              },
              {
                step: '2',
                title: 'Get Matched',
                description: 'See your top 3 cards with side-by-side comparisons.'
              },
              {
                step: '3',
                title: 'Earn Smarter',
                description: 'Track rewards and get redemption tips tailored to you.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Who We Are</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <img 
                src="/api/placeholder/400/400" 
                alt="Adithyan Menon"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-2">Adithyan Menon</h3>
              <p className="text-green-500 font-semibold mb-4">CEO</p>
              <p className="text-gray-600">
                Finance Guru & Turnaround Story. Chartered Accountant turned entrepreneur. 
                From trembling in crowds to leading financial innovation—proving anyone can master money.
              </p>
            </div>
            <div className="text-center">
              <img 
                src="/api/placeholder/400/400" 
                alt="Vaishnav Sudhakar"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-6 shadow-lg"
              />
              <h3 className="text-2xl font-bold mb-2">Vaishnav Sudhakar</h3>
              <p className="text-green-500 font-semibold mb-4">CTO</p>
              <p className="text-gray-600">
                Tech Architect & Financial Literacy Advocate. Built AI chatbots before ChatGPT 
                and founded developer communities. Now bridging the gap between credit cards and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="text-4xl font-bold text-center mb-16">Talk to Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              ></textarea>
            </div>
            {submitStatus.message && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}
            <button 
              type="submit"
              className="w-full bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>© 2024 GoCard. All rights reserved.</p>
          <p className="mt-2">Empowering 10,000+ users to choose wisely since 2024.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;