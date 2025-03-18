import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const deleteJob = async id => {
    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            {job.title}
            <button onClick={() => deleteJob(job._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
