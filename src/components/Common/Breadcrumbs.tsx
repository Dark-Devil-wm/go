import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex mb-12" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-white/40 hover:text-white transition-colors">
              <Home size={14} />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 text-white/20" size={12} />
                <Link
                  to={to}
                  className={`ml-4 text-[10px] uppercase font-mono tracking-widest transition-colors ${
                    last ? 'text-brand-blue font-bold cursor-default' : 'text-white/40 hover:text-white'
                  }`}
                  aria-current={last ? 'page' : undefined}
                >
                  {value.replace('-', ' ')}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
