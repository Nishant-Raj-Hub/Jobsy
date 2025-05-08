import React, { useState } from "react";
import type { Job } from "../types";
import JobCard from "./JobCard";
import { Search } from "lucide-react";
import { fetchJobs } from "../services/api";

interface JobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
  loading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  selectedJob,
  onSelectJob,
  loading,
  error,
  onLoadMore,
  hasMore,
  loadingMore,
  setJobs,
}) => {
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchJobs(1, 30, searchLocation);
      setSearchLocation("");
      setJobs(res.jobs);
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-error-500 text-center py-8">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:cursor-pointer">
      <div className="p-4 border-b">
        <form onSubmit={handleSearch} className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search location..."
              className="w-full pl-10 pr-4 py-2 border border-blue-500 rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:cursor-pointer hover:bg-blue-600 transition duration-300 text-white rounded-lg hover:bg-primary-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Available Jobs</h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="job-card">
                <div className="skeleton h-6 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-1/2 mb-2"></div>
                <div className="skeleton h-4 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No jobs found</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isSelected={selectedJob?._id === job._id}
                  onClick={() => onSelectJob(job)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-4 text-center">
                <button
                  className="px-4 py-2 bg-white border border-gray-300 text-sm rounded-lg hover:bg-gray-100 transition"
                  onClick={onLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobList;
