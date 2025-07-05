import axios from "axios";
import * as fs from "fs";
import multer from "multer";
import path from "path";

const STORAGE_ZONE_NAME = process.env.STORAGE_ZONE_NAME;
const BUNNYCDN_API_KEY = process.env.BUNNYCDN_API_KEY;
const BUNNYCDN_HOSTNAME = process.env.BUNNYCDN_HOSTNAME;

export const BunnyCDNUpload = async (file: any) => {
  const fileStream = fs.createReadStream(file.path);
  const uniqueFilename = `${Date.now()}-${file.filename}-${file.originalname}`;

  try {
    const response = await axios.put(
      `https://storage.bunnycdn.com/${STORAGE_ZONE_NAME}/${uniqueFilename}`,
      fileStream,
      {
        headers: {
          AccessKey: BUNNYCDN_API_KEY,
        },
      }
    );

    if (response.status === 201) {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return `https://${BUNNYCDN_HOSTNAME}/${uniqueFilename}`;
    } else {
      console.error("BunnyCDN Upload failed:", response.statusText);
      return false;
    }
  } catch (error: any) {
    console.error("BunnyCDN Upload error:", error.message);
    return false;
  } finally {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
};

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

// setup multer for multiple image upload and single image upload with file filter
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads/");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + file.originalname);
  },
});

let fileFilter = async (req: any, file: any, cb: any) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// Initialize Multer
export const upload = multer({ storage: storage, fileFilter: fileFilter });
