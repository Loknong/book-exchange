import React from "react";
import Card from "../base/Card";
import Badge from "../base/Badge";

interface DashboardWidgetProps {
  title: string;
  value: string;
  badgeText?: string;
  badgeVariant?: "primary" | "secondary" | "success" | "warning" | "danger";
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  value,
  badgeText,
  badgeVariant = "primary",
}) => {
  return (
    <Card title={title} subtitle={value} shadow="lg">
      {badgeText && <Badge text={badgeText} variant={badgeVariant} />}
    </Card>
  );
};

export default DashboardWidget;
