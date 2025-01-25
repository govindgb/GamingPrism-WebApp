"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { saveUser, checkUserExists } from "@/utils/localStorage";
import { validatePassword } from "@/utils/validation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GoogleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

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
      message.error("Username already exists");
      setLoading(false);
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(values.password);
    if (passwordErrors.length > 0) {
      passwordErrors.forEach((error) => message.error(error));
      setLoading(false);
      return;
    }

    // Check password confirmation
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Save user
    saveUser(values.username, values.password);
    message.success("Signup Successful");

    // Use router.push from next/navigation
    router.push("/login");

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  // Prevent rendering until mounted to avoid router issues
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Create an Account
        </h2>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password!" }]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
            >
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center mb-4">
            <Link href="/login" className="text-indigo-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </Form>

        <div className="flex items-center justify-center mt-4">
          <Button
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Sign in with Google
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
