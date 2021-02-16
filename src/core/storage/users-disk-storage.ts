import { extname } from 'path';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

export const usersDiskStorage = diskStorage({
  destination: './public/img/users',
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return cb(null, `${randomName}${extname(file.originalname)}`);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/webp' &&
      file.mimetype !== 'image/gif'
    )
      return cb(
        new HttpException(
          'File extension not allowed',
          HttpStatus.NOT_ACCEPTABLE,
        ),
        false,
      );
    return cb(null, true);
  },
});
