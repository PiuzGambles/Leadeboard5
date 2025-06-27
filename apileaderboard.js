// api/leaderboard.js
export default async function handler(req, res) {
  const API_KEY = '00c5bb44-21d2-40e1-81da-8d64733de6a1';

  // Візьми параметри з запиту, або підстав дефолтні (наприклад за останній тиждень)
  const fromTime = req.query.fromTime || Math.floor(Date.now() / 1000) - 7 * 24 * 3600;
  const toTime = req.query.toTime || Math.floor(Date.now() / 1000);

  const url = `https://api.rustmagic.com/api/affiliates-data/users?fromTime=${fromTime}&toTime=${toTime}`;

  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const API_BASE = '/api/leaderboard';

async function fetchBoard(board) {
  const now = Math.floor(Date.now() / 1000);
  const weekAgo = now - 7 * 24 * 3600;
  const url = `${API_BASE}?fromTime=${weekAgo}&toTime=${now}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    return json.data.filter(u => u.board?.toLowerCase() === board.toLowerCase());
  } catch (err) {
    console.error('Failed to fetch leaderboard:', err);
    return [];
  }
}