import { Card } from '../ui/Card';
import { Shield, Zap, BarChart3, Users, Globe, Smartphone } from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Optimized performance that ensures your dashboard loads in milliseconds, no matter the data size.',
    icon: Zap,
  },
  {
    title: 'Secure by Design',
    description: 'Enterprise-grade security with end-to-end encryption and multi-factor authentication for all users.',
    icon: Shield,
  },
  {
    title: 'Advanced Analytics',
    description: 'Deep dive into your business metrics with our intuitive and powerful reporting engine.',
    icon: BarChart3,
  },
  {
    title: 'Team Collaboration',
    description: 'Built-in tools for seamless communication and task management across your entire organization.',
    icon: Users,
  },
  {
    title: 'Global Infrastructure',
    description: 'Deploy anywhere with our edge-first network that brings your app closer to your customers.',
    icon: Globe,
  },
  {
    title: 'Mobile First',
    description: 'Full-featured mobile application that allows you to manage your business on the go.',
    icon: Smartphone,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Powerful features designed to help you work smarter, not harder.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:border-blue-500/50 transition-colors">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
