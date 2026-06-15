import { Button } from '../ui/Button';
import { ArrowRight, Star } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
          <Star className="h-4 w-4 fill-current text-blue-600" />
          <span>New: AI-powered analytics is here</span>
        </div>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
          Scale your business with <br />
          <span className="text-blue-600">
            intelligent automation
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          The all-in-one platform to manage your workflows, track performance, and grow your team.
          Built for modern teams who demand excellence.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="h-12 px-8">
            Get started for free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8">
            View live demo
          </Button>
        </div>

        {/* <div className="mt-20 relative">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900/50">
            <div className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-slate-400 dark:text-slate-600 text-sm font-medium">Dashboard Preview Placeholder</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
