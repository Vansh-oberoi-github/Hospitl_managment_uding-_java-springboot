let appointments = [
  { id: 1, name: "Harpreet Singh", age: "30", symptoms: "Fever and cold", number: "9876543210" },
  { id: 2, name: "Neha Sharma", age: "25", symptoms: "Headache", number: "9876543211" }
];
let nextId = 3;

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
      const appt = appointments.find(a => a.id === id);
      return appt ? res.status(200).json(appt) : res.status(404).json({ error: "Appointment not found" });
    }
    return res.status(200).json(appointments);
  }

  if (req.method === 'POST') {
    const data = req.body || {};
    const newAppointment = {
      id: nextId++,
      name: data.name || '',
      age: data.age || '',
      symptoms: data.symptoms || '',
      number: data.number || ''
    };
    appointments.push(newAppointment);
    return res.status(200).json(newAppointment);
  }

  if (req.method === 'DELETE') {
    if (id === null) return res.status(400).json({ error: "Missing ID" });
    appointments = appointments.filter(a => a.id !== id);
    return res.status(200).json({ deleted: true });
  }

  res.status(405).json({ error: "Method not allowed" });
};

