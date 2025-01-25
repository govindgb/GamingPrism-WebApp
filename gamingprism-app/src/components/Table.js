// Update the table component in src/components/TableComponent.js
import React from "react";
import { Table, Button } from "antd";
import { useRouter } from "next/navigation";

const TableComponent = ({ data }) => {
  const router = useRouter();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => router.push(`/item/${record.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default TableComponent;
