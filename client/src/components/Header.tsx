import React from 'react';
import { Briefcase } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="text-primary-500 h-6 w-6" />
          <h1 className="text-xl font-bold text-primary-600">Jobsy</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-slate-700 hover:text-primary-500 font-medium">Jobs</a>
            <a href="#" className="text-slate-700 hover:text-primary-500 font-medium">Companies</a>
            <a href="#" className="text-slate-700 hover:text-primary-500 font-medium">Salary</a>
          </nav>
          <button className="btn btn-primary">
            Post a Job
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;