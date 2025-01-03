import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('/api/signup', formData);
      setSuccessMessage('User signed up successfully!');
      // Redirect to login page or show success message
      window.location.href = '/sign-in';
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h1>Sign Up</h1>
          {successMessage && <Alert color="success">{successMessage}</Alert>}
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
            </FormGroup>
            <Button color="primary" type="submit">Sign Up</Button>
          </Form>
          <div className="mt-3">
            <p>
              Already have an account? <Link href="/sign-in" style={{ color: 'blue' }}>Sign In</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
