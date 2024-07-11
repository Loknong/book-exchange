// interface log {
//   message: string;
//   transactionId: number;
// }

export const logAction = async (message: string, transactionId: number) => {
  console.log(`${message} : ${transactionId}`);
};
