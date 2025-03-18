import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobDetails = ({ match }) => {
  const [job, setJob] = useState({});
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`/api/jobs/${match.params.id}`);
      setJob(res.data);
    };
    fetchJob();
  }, [match.params.id]);

  const applyForJob = async () => {
    try {
      await axios.put(`/api/jobs/apply/${job._id}`);
      setApplied(true);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>{job.location}</p>
      <p>{job.category}</p>
      <button onClick={applyForJob} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
};

export default JobDetails;
