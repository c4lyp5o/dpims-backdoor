export default async function handler(req, res) {
  const { nama } = req.query;
  const url = `http://localhost:6565/v1/getdpims?nama=${nama}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
