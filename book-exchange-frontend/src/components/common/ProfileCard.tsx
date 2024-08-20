import React from "react";
import Card from "../base/Card";
import Badge from "../base/Badge";
import Button from "../base/Button";

interface ProfileCardProps {
  name: string;
  email: string;
  status: "active" | "inactive";
  onEdit: () => void;
  onDelete: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  status,
  onEdit,
  onDelete,
}) => {
  const statusVariant = status === "active" ? "success" : "danger";

  return (
    <Card title={name} subtitle={email} shadow="md" footer={
      <div className="flex space-x-2">
        <Button variant="primary" onClick={onEdit} shadow="sm">
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete} shadow="sm">
          Delete
        </Button>
      </div>
    }>
      <Badge text={status === "active" ? "Active" : "Inactive"} variant={statusVariant} />
    </Card>
  );
};

export default ProfileCard;
