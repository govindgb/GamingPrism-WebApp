"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Breadcrumb, Button, Form, Input, message } from "antd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateItem } from "@/app/redux/actions/dataActions"; // Adjust the import as needed

const ItemDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Get the item ID from URL
  const [form] = Form.useForm(); // Create form instance
  const [loading, setLoading] = useState(false);
  
  // Fetch the item from Redux using the id
  const item = useSelector((state) => state.data.items.find((item) => item.id === Number(id)));
  const dispatch = useDispatch(); // To dispatch actions to Redux

  // If item not found in Redux state
  if (!item) {
    return (
      <div className="text-center p-5">
        <h2>Item not found.</h2>
        <Button onClick={() => router.push("/")} className="mt-5">
          Go Back to List
        </Button>
      </div>
    );
  }

  // Set form values when the item is available
  useEffect(() => {
    form.setFieldsValue(item); // Set form fields with the item data
  }, [item, form]);

  // Handle form submission
  const handleSave = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      // Dispatch the updateItem action to update Redux store
      dispatch(updateItem(item.id, values));

      message.success("Item updated successfully!");
      router.push("/"); // Redirect to the list page
    } catch (error) {
      message.error("Failed to update the item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-5 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-5 text-lg"
        items={[
          { title: <a onClick={() => router.push("/")}>Home</a> },
          { title: `Item ${id}` },
        ]}
      />

      {/* Page Title */}
      <motion.h2
        className="text-2xl font-bold mb-6 text-center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        Item Details
      </motion.h2>

      {/* Item Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white shadow-md rounded-md p-5"
      >
        <Form
          form={form} // Connect form instance to the Form
          layout="vertical"
          onFinish={handleSave}
          className="space-y-4"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required!" }]}
          >
            <Input className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, message: "Body is required!" }]}
          >
            <Input.TextArea rows={4} className="rounded-md" />
          </Form.Item>

          <div className="flex gap-4 justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              Back to List
            </Button>
          </div>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default ItemDetail;
