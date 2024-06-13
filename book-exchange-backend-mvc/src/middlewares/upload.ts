import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storageConfig = (destination: string) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

export const bookUpload = multer({
  storage: storageConfig('uploads/books/'),
  fileFilter: fileFilter,
});

export const userUpload = multer({
  storage: storageConfig('uploads/users/'),
  fileFilter: fileFilter,
});

export const paymentEvidence = multer({
  storage: storageConfig('uploads/payment/'),
  fileFilter: fileFilter,
});