import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jobRoutes from './routes/jobRoutes'
import cors from 'cors'; // ✅ import cors


dotenv.config()

const app = express()
const PORT = 5000
const MONGO_URL = "mongodb+srv://jobsy-user:jobsy-password@cluster0.k9ifzgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is working!')
})

app.use('/api/jobs', jobRoutes);  


mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })
