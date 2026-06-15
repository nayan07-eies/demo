import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold tracking-tight">SaaSify</span>
            </div>
            <p className="mt-4 max-w-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Building the future of team automation and business intelligence. 
              Join 10,000+ teams who trust SaaSify.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">Features</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">Pricing</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">API</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">About</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-500 text-center">
            © {new Date().getFullYear()} SaaSify Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
