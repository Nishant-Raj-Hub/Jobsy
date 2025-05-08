import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController';

const router = express.Router();

// GET /api/jobs - Get all jobs
router.get('/', getAllJobs);

// GET /api/jobs/:id - Get job by ID
router.get('/:id', getJobById);




export default router;