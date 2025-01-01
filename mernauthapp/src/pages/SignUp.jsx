import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pagestyles/signup.css';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      return "All fields are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email.";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/backend/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (!res.ok || data.success === false) {
        setError(data.message || 'Something went wrong!');
        return;
      }
      
      navigate('/sign-in');
    } catch (err) {
      setError('An error occurred, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="form-input"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="form-input"
          value={formData.password}
          onChange={handleChange}
        />
        <button disabled={loading} className="submit-button">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="link-container">
        <p>Already have an account? <Link to="/sign-in">Sign in</Link></p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
