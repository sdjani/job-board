import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={JobList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/jobs/:id" component={JobDetails} />
        <Route path="/admin" component={AdminPanel} />
      </Switch>
    </Router>
  );
};

export default App;
