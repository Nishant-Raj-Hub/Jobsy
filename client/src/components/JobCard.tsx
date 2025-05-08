import React from "react";
import type { Job } from "../types";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Briefcase } from "lucide-react";

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onClick }) => {
  const postedDate = job.postedDateTime ? new Date(job.postedDateTime) : null;
  const timeAgo = postedDate
    ? formatDistanceToNow(postedDate, { addSuffix: true })
    : "Unknown";
  return (
    <div
      className={`job-card ${isSelected ? "active" : "bg-white"}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          {job.companyImageUrl && (
            <img
              src={job.companyImageUrl}
              alt={job.company}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-800 truncate">
            {job.title}
          </h3>
          <p className="text-sm text-slate-600 truncate">{job.company}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              <span>{job.employment_type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-slate-500">{timeAgo}</span>
        {job.source && (
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
            {job.source}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
