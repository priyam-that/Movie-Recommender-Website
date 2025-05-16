import React from 'react';
import '../Styles/PricingPlans.css';

const plans = [
  {
    name: 'Free',
    price: '$0',
    duration: '/mo',
    features: [
      '100 credits',
      'Email support',
      '3 projects',
      '1 personal organization',
      'Only 1 member in organization',
    ],
    button: 'Get Started',
    popular: false,
    comingSoon: false,
  },
  {
    name: 'Pro',
    price: '$8',
    duration: '/mo',
    features: [
      '1000 credits',
      'Priority support',
      'Unlimited projects',
      '1 organization',
      'Add up to 5 users to organizations',
    ],
    button: 'Get in touch',
    popular: true,
    comingSoon: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    duration: '',
    features: [
      'No limit on any feature',
      'Dedicated support',
      'Custom integrations',
      'SLAs & security review',
      'White-glove onboarding',
    ],
    button: 'Coming Soon',
    popular: false,
    comingSoon: true,
  },
];

export default function PricingPlans() {
  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Pricing Plans</h1>
        <p>Your Budget Will Barely Notice Us</p>
      </div>

      <div className="plans-wrapper">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            {plan.popular && <span className="popular-tag">Most Popular</span>}

            <h2>{plan.name}</h2>
            <div className="plan-price">
              {plan.price}
              <span>{plan.duration}</span>
            </div>

            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i}>● {feature}</li>
              ))}
            </ul>

            <button
              className={`plan-button ${
                plan.comingSoon ? 'disabled' : ''
              }`}
              disabled={plan.comingSoon}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
