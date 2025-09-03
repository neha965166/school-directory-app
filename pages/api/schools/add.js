// // pages/api/schools/add.js
// import fs from 'fs';
// import path from 'path';
// import multer from 'multer';
// import { getPool } from '../../../lib/db';


// export const config = {
// api: {
// bodyParser: false, // we handle multipart/form-data with multer
// },
// };
// // Ensure folder exists
// const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
// if (!fs.existsSync(uploadDir)) {
// fs.mkdirSync(uploadDir, { recursive: true });
// }


// // Multer storage config
// const storage = multer.diskStorage({
// destination: function (_req, _file, cb) {
// cb(null, uploadDir);
// },
// filename: function (_req, file, cb) {
// const ext = path.extname(file.originalname) || '.jpg';
// const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
// cb(null, `${Date.now()}_${base}${ext}`);
// },
// });
// const upload = multer({
// storage,
// limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
// });


// function runMiddleware(req, res, fn) {
// return new Promise((resolve, reject) => {
// fn(req, res, (result) => {
// if (result instanceof Error) return reject(result);
// return resolve(result);
// });
// });
// }
// export default async function handler(req, res) {
// if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });


// try {
// // Run multer
// await runMiddleware(req, res, upload.single('image'));


// // After multer, fields are in req.body, file is in req.file
// const { name, address, city, state, contact, email_id } = req.body;


// // Basic server-side validations
// if (!name || !address || !city || !state || !contact || !email_id) {
// return res.status(400).json({ error: 'All fields are required' });
// }
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// if (!emailRegex.test(email_id)) {
// return res.status(400).json({ error: 'Invalid email format' });
// }


// const phoneRegex = /^[0-9+\-()\s]{7,20}$/;
// if (!phoneRegex.test(contact)) {
// return res.status(400).json({ error: 'Invalid contact number' });
// }


// const filePath = req.file ? `/schoolImages/${req.file.filename}` : null;
// const pool = getPool();
// const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id)
// VALUES (?, ?, ?, ?, ?, ?, ?)`;
// const values = [name, address, city, state, contact, filePath, email_id];


// await pool.execute(sql, values);
// return res.status(201).json({ message: 'School added successfully' });
// } catch (err) {
// console.error('Add school error:', err);
// return res.status(500).json({ error: 'Internal Server Error' });
// }
// }



import { getPool } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, address, city, state, contact, email_id } = req.body;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const pool = getPool();
    const sql = `INSERT INTO schools (name, address, city, state, contact, email_id) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, address, city, state, contact, email_id];
    await pool.execute(sql, values);

    return res.status(201).json({ message: "School added successfully" });
  } catch (err) {
    console.error("Add school error:", err);
    return res.status(500).json({ error: err.message });
  }
}
