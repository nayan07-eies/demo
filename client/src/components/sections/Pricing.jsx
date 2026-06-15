import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for side projects and individual developers.',
    features: ['Up to 3 projects', 'Basic analytics', 'Community support', '1GB storage'],
    buttonText: 'Start for free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Best for growing teams and startups.',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'Custom domains',
      'Team seats (up to 5)',
    ],
    buttonText: 'Get started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated infrastructure for large scale businesses.',
    features: [
      'Dedicated infrastructure',
      'Custom SLA',
      'Account manager',
      'Unlimited storage',
      'Advanced security',
      'Unlimited team seats',
    ],
    buttonText: 'Contact sales',
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that's right for you. No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col p-8 ${
                tier.popular ? 'border-blue-600 ring-1 ring-blue-600 dark:border-blue-500 dark:ring-blue-500' : ''
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-slate-600 dark:text-slate-400">/mo</span>}
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{tier.description}</p>
              </div>

              <ul className="mb-8 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Check className="h-5 w-5 text-blue-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant={tier.popular ? 'primary' : 'outline'} className="w-full">
                {tier.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
