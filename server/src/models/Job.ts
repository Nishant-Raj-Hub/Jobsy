import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  'Job ID (Numeric)': string;
  title: string;
  company: string;
  location: string;
  job_link: string;
  employment_type: string;
  experience: string;
  source: string;
  country: string;
  postedDateTime: Date;
  companyImageUrl: string;
  min_exp: number;
  max_exp: number;
  seniority_level?: string;
  company_url?: string;
  companytype?: string;
}

const JobSchema: Schema = new Schema({
  'Job ID (Numeric)': {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  job_link: {
    type: String,
    required: true,
  },
  employment_type: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postedDateTime: {
      type: Date,
      required: true,
      default: Date.now,
  },
  companyImageUrl: {
    type: String,
    required: true,
  },
  min_exp: {
    type: Number,
    required: true,
  },
  max_exp: {
    type: Number,
    required: true,
  },
  seniority_level: {
    type: String,
  },
  company_url: {
    type: String,
  },
  companytype: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IJob>('Job', JobSchema);