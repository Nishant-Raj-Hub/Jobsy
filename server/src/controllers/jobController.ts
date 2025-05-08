import { Request, Response } from 'express';
import Job from '../models/Job';

// Get all jobs with pagination and location-based search
export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 30;
    const skip = (page - 1) * limit;
    const location = req.query.location as string;

    // Build query
    let query = {};
    if (location) {
      query = {
        location: { $regex: location, $options: 'i' } // case-insensitive search
      };
    }

    const jobs = await Job.find(query)
      .sort({ postedDateTime: -1 })
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      jobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Get job by ID
export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Error fetching job', error });
  }
};

