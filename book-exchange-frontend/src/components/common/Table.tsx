import React from "react";
import Button from "../base/Button";
import Card from "../base/Card";

interface Book {
  id: string;
  title: string;
  author: string;
  status: string;
}

interface TableProps {
  headers: string[];
  data: Book[];
  onActionClick: (action: string, row: Book) => void;
}

const Table: React.FC<TableProps> = ({ headers, data, onActionClick }) => {
  console.log("Table Data:", data);

  return (
    <Card title="Book Data Table" shadow="md">
      <table className="min-w-full bg-secondary shadow-md">
        <thead className="bg-neutral text-secondary">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 text-secondary">
                {header}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={
                index % 2 === 0 ? "bg-secondary-muted" : "bg-secondary"
              }
            >
              <td className="border px-4 py-2">{row.title}</td>
              <td className="border px-4 py-2">{row.author}</td>
              <td className="border px-4 py-2">{row.status}</td>
              <td className="border px-4 py-2">
                <Button
                  variant="primary"
                  onClick={() => onActionClick("edit", row)}
                  shadow="sm"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onActionClick("delete", row)}
                  shadow="sm"
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
