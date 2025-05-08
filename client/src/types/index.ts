export interface Job {
  _id: string;
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