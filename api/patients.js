let patients = [
  { id: 1, name: "Rahul Sharma", age: "32", blood: "O+", prescription: "Paracetamol", dose: "500mg twice daily", fees: "500", urgency: "Normal" },
  { id: 2, name: "Priya Patel", age: "28", blood: "A+", prescription: "Amoxicillin", dose: "250mg once daily", fees: "700", urgency: "High" },
  { id: 3, name: "Amit Kumar", age: "45", blood: "B+", prescription: "Metformin", dose: "500mg daily", fees: "600", urgency: "Normal" }
];
let nextId = 4;

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
      const patient = patients.find(p => p.id === id);
      return patient ? res.status(200).json(patient) : res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json(patients);
  }

  if (req.method === 'POST') {
    const data = req.body || {};
    const newPatient = {
      id: nextId++,
      name: data.name || '',
      age: data.age || '',
      blood: data.blood || '',
      prescription: data.prescription || '',
      dose: data.dose || '',
      fees: data.fees || '',
      urgency: data.urgency || ''
    };
    patients.push(newPatient);
    return res.status(200).json(newPatient);
  }

  if (req.method === 'PUT') {
    if (id === null) return res.status(400).json({ error: "Missing ID" });
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Patient not found" });
    const data = req.body || {};
    patients[index] = { ...patients[index], ...data, id };
    return res.status(200).json(patients[index]);
  }

  if (req.method === 'DELETE') {
    if (id === null) return res.status(400).json({ error: "Missing ID" });
    patients = patients.filter(p => p.id !== id);
    return res.status(200).json({ deleted: true });
  }

  res.status(405).json({ error: "Method not allowed" });
};

