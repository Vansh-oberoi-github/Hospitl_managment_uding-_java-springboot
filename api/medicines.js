let medicines = [
  { id: 1, drugName: "Paracetamol", stock: "150" },
  { id: 2, drugName: "Amoxicillin", stock: "80" },
  { id: 3, drugName: "Metformin", stock: "200" },
  { id: 4, drugName: "Cetirizine", stock: "95" }
];
let nextId = 5;

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';
  const match = url.match(/\/(\d+)$/);
  const id = match ? parseInt(match[1], 10) : null;

  if (req.method === 'GET') {
    if (id !== null) {
      const medicine = medicines.find(m => m.id === id);
      return medicine ? res.status(200).json(medicine) : res.status(404).json({ error: "Medicine not found" });
    }
    return res.status(200).json(medicines);
  }

  if (req.method === 'POST') {
    const data = req.body || {};
    const newMedicine = {
      id: nextId++,
      drugName: data.drugName || '',
      stock: data.stock || ''
    };
    medicines.push(newMedicine);
    return res.status(200).json(newMedicine);
  }

  if (req.method === 'PUT') {
    if (id === null) return res.status(400).json({ error: "Missing ID" });
    const index = medicines.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Medicine not found" });
    const data = req.body || {};
    medicines[index] = { ...medicines[index], ...data, id };
    return res.status(200).json(medicines[index]);
  }

  if (req.method === 'DELETE') {
    if (id === null) return res.status(400).json({ error: "Missing ID" });
    medicines = medicines.filter(m => m.id !== id);
    return res.status(200).json({ deleted: true });
  }

  res.status(405).json({ error: "Method not allowed" });
};

