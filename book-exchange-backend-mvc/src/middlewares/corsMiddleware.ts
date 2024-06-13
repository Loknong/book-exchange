// src/middlewares/corsMiddleware.ts
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // specify the allowed origin
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
