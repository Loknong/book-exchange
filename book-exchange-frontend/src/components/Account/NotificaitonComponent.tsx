import React from "react";

const Notifications: React.FC = () => {
  const notifications = [
    { message: "Offer accepted by UserA", date: "2024-09-10" },
    { message: "You received an offer from UserB", date: "2024-09-09" },
    { message: "Offer rejected by UserC", date: "2024-09-08" },
    { message: "Offer accepted by UserA", date: "2024-09-10" },
    { message: "You received an offer from UserB", date: "2024-09-09" },
    { message: "Offer rejected by UserC", date: "2024-09-08" },
    { message: "Offer rejected by UserC", date: "2024-09-08" },
    { message: "Offer accepted by UserA", date: "2024-09-10" },
    { message: "You received an offer from UserB", date: "2024-09-09" },
    { message: "Offer rejected by UserC", date: "2024-09-08" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-h-[29.5rem] overflow-auto scrollbar-hide">
      <h3 className="text-lg font-semibold mb-4">Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="mb-2">
            <p className="text-sm text-gray-700">{notification.message}</p>
            <p className="text-xs text-gray-400">{notification.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
