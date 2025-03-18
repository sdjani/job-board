const express = require('express');
const auth = require('../middleware/auth');
const Job = require('../models/Job');

const router = express.Router();

// Create a job
router.post('/', auth, async (req, res) => {
  const { title, description, location, category } = req.body;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      category,
      employer: req.user.id,
    });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name');
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Apply for a job
router.put('/apply/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already applied' });
    }
    job.applicants.push(req.user.id);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
