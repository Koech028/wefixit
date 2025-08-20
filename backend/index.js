const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const DATA_FILE = './projects.json';

// Helper to read projects from file
const getProjects = () => {
  try {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// GET all projects
app.get('/api/projects', (req, res) => {
  const projects = getProjects();
  res.json(projects);
});

// POST new project
app.post('/api/projects', (req, res) => {
  const projects = getProjects();
  const newProject = req.body;
  projects.push(newProject);

  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
  res.status(201).json({ message: 'Project added', project: newProject });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
