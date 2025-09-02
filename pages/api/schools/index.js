// pages/api/schools/index.js
import { getPool } from '../../../lib/db';


export default async function handler(req, res) {
if (req.method === 'GET') {
try {
const pool = getPool();
const [rows] = await pool.query(
'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC'
);
return res.status(200).json(rows);
} catch (err) {
console.error('Fetch schools error:', err);
return res.status(500).json({ error: 'Internal Server Error' });
}
}
return res.status(405).json({ error: 'Method Not Allowed' });
}