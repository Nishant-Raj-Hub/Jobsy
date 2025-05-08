import React from 'react';
import type { Job } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Briefcase, Calendar, Building, Globe, ExternalLink } from 'lucide-react';

interface JobDetailsProps {
  job: Job | null;
  loading: boolean;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, loading }) => {
  if (loading) {
    return (
      <div className="details-panel">
        <div className="skeleton h-8 w-3/4 mb-4"></div>
        <div className="skeleton h-4 w-1/2 mb-6"></div>
        <div className="skeleton h-24 w-full mb-6"></div>
        <div className="skeleton h-4 w-2/3 mb-2"></div>
        <div className="skeleton h-4 w-3/4 mb-2"></div>
        <div className="skeleton h-4 w-1/2 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="details-panel flex items-center justify-center">
        <p className="text-slate-500">Select a job to view details</p>
      </div>
    );
  }

  const postedDate = new Date(
    (job.postedDateTime) || job.postedDateTime || ''
  );
  
  const timeAgo = isNaN(postedDate.getTime())
    ? 'Unknown'
    : formatDistanceToNow(postedDate, { addSuffix: true });

  return (
    <div className="details-panel fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border">
        <img
          src={job.companyImageUrl || undefined}
          alt={`${job.company} logo`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/60?text=' + job.company.charAt(0);
          }}
        />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800">{job.title}</h1>
          <p className="text-slate-600">{job.company}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span className="font-medium">Location</span>
          </div>
          <p className="mt-1 text-slate-600">{job.location}</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-slate-700">
            <Briefcase className="h-4 w-4 text-primary-500" />
            <span className="font-medium">Job Type</span>
          </div>
          <p className="mt-1 text-slate-600">{job.employment_type}</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-slate-700">
            <Calendar className="h-4 w-4 text-primary-500" />
            <span className="font-medium">Posted</span>
          </div>
          <p className="mt-1 text-slate-600">{timeAgo}</p>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-slate-700">
            <Building className="h-4 w-4 text-primary-500" />
            <span className="font-medium">Experience</span>
          </div>
          <p className="mt-1 text-slate-600">{job.experience}</p>
        </div>
      </div>

      {job.seniority_level && (
        <div className="mb-6">
          <h2 className="text-md font-semibold mb-2">Seniority Level</h2>
          <p className="text-slate-700">{job.seniority_level}</p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-md font-semibold mb-2">Job Source</h2>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-slate-500" />
          <span className="text-slate-700">{job.source}</span>
        </div>
      </div>

      <div className="mt-8">
        <a 
          href={job.job_link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary inline-flex items-center gap-2"
        >
          Apply Now <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default JobDetails;