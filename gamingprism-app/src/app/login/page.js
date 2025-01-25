"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, message } from 'antd';
import { authenticateUser } from '@/utils/localStorage';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if already authenticated
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.length > 0) {
        router.push('/');
      }
    }
  }, [router]);

  const onFinish = (values) => {
    setLoading(true);
    
    if (authenticateUser(values.username, values.password)) {
      message.success('Login Successful');
      router.push('/');
    } else {
      message.error('Invalid username or password');
    }
    
    setLoading(false);
  };

  // Prevent rendering until mounted to avoid router issues
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          name="login"
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

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="w-full"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}