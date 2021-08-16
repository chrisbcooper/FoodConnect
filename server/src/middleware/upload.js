import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import mime from 'mime-types';
import config from '@app/config';

const awsConfig = {
  secretAccessKey: config.SECRET_ACCESS_KEY,
  accessKeyId: config.ACCESS_KEY_ID,
  region: config.REGION,
};
aws.config.update(awsConfig);

const s3 = new aws.S3();

// TODO: make a hashing function for unique names
// add check for names?
export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.BUCKET,
    metadata: (_, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (_, file, cb) => {
      return cb(
        null,
        Date.now().toString() + '.' + mime.extension(file.mimetype)
      );
    },
  }),
});