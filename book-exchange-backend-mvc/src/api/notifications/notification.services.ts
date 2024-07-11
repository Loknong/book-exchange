// interface notification {
//     userId: number;
//     message: string;
//   }

export const sendNotification = async (userId: number, message: string) => {
  console.log(`Notification to User ${userId}: ${message}`);
};
