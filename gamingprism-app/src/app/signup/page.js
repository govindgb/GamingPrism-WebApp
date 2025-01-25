"use client"
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { saveUser, checkUserExists } from '@/utils/localStorage';
import { validatePassword } from '@/utils/validation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    
    // Check if user already exists
    if (checkUserExists(values.username)) {
      message.error('Username already exists');
      setLoading(false);
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(values.password);
    if (passwordErrors.length > 0) {
      passwordErrors.forEach(error => message.error(error));
      setLoading(false);
      return;
    }

    // Check password confirmation
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      setLoading(false);
      return;
    }

    // Save user
    saveUser(values.username, values.password);
    message.success('Signup Successful');
    
    // Use router.push from next/navigation
    router.push('/login');
    
    setLoading(false);
  };

  // Prevent rendering until mounted to avoid router issues
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center">
            <Link href="/login" className="text-blue-500">
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}