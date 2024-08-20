import React, { useState } from "react";
import Input from "../base/Input";
import Button from "../base/Button";
import Card from "../base/Card";

interface FormProps {
  onSubmit: (formData: { [key: string]: string }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card title="Sign Up" shadow="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          name="name"
          shadow="sm"
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          shadow="sm"
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          shadow="sm"
        />
        <Button type="submit" variant="primary" shadow="md">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default Form;
