import React from "react";
import Card from "../base/Card";
import Button from "../base/Button";

interface NotificationProps {
  message: string;
  variant?: "success" | "warning" | "danger";
  onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  variant = "success",
  onDismiss,
}) => {
  return (
    <Card title="Notification" variant={variant} shadow="lg" footer={
      <Button variant="secondary" onClick={onDismiss} shadow="sm">
        Dismiss
      </Button>
    }>
      <p>{message}</p>
    </Card>
  );
};

export default Notification;
