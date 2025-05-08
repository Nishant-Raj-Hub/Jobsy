import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import type { Job } from "./types";
import { fetchJobs } from "./services/api";

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadJobs = useCallback(
    async (initial = false) => {
      try {
        if (initial) setLoading(true);
        else setLoadingMore(true);

        const res = await fetchJobs(page, 30);
        setJobs((prev) => (initial ? res.jobs : [...prev, ...res.jobs]));
        if (res.jobs.length > 0 && initial) setSelectedJob(res.jobs[0]);
        setHasMore(res.jobs.length > 0);
      } catch {
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        if (initial) setLoading(false);
        else setLoadingMore(false);
      }
    },
    [page]
  );

  useEffect(() => {
    loadJobs(true);
  }, [loadJobs]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loadingMore, hasMore]);

  useEffect(() => {
    if (page > 1) loadJobs();
  }, [page, loadJobs]);

  const handleJobSelect = (job: Job) => setSelectedJob(job);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5 lg:col-span-4">
            <JobList
              jobs={jobs}
              selectedJob={selectedJob}
              onSelectJob={handleJobSelect}
              loading={loading}
              error={error}
              onLoadMore={handleLoadMore}
              loadingMore={loadingMore}
              hasMore={hasMore}
              setJobs={setJobs}
            />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <JobDetails job={selectedJob} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
