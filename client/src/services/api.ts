import axios from 'axios';
import type { Job } from '../types';

const API_URL = 'https://jobsy-syac.onrender.com/api';

interface JobsResponse {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
}

export const fetchJobs = async (page: number, limit: number, location?: string): Promise<JobsResponse> => {
  try {
    const url = location 
      ? `https://jobsy-syac.onrender.com/api/jobs?page=${page}&limit=${limit}&location=${location}`
      : `https://jobsy-syac.onrender.com/api/jobs?page=${page}&limit=${limit}`;
      
    const response = await axios.get<JobsResponse>(url, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs", error);
    throw error;
  }
};

export const fetchJobById = async (id: string): Promise<Job> => {
  const response = await axios.get<Job>(`${API_URL}/jobs/${id}`);
  return response.data;
};