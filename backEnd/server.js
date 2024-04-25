// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const uuid = require('uuid');

app.use('/images', express.static('images'));


app.use(express.json());
app.use(cors());

let db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Users table created successfully.');
  });

  db.run(`CREATE TABLE IF NOT EXISTS doctors (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT,
    specialty TEXT,
    area_of_focus TEXT,
    board_certified TEXT,
    rating REAL,
    languages_spoken TEXT,
    education TEXT,
    license TEXT,
    treatment_approach TEXT,
    experience_years INTEGER
  )`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Doctors table created successfully.');
      addDoctors();
    }
  });

  
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    doctor_id TEXT,
    start_time TEXT,
    end_time TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(doctor_id) REFERENCES doctors(id)
  )`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Appointments table created successfully.');
    }
  });
  
});

app.post('/signup', (req, res) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    return res.status(400).send('Username, password, and name are required');
  }
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (row) {
      return res.status(400).send('Username already exists');
    }
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        return res.status(500).send('Server bcrypt error');
      }
      db.run(`INSERT INTO users (username, password, name) VALUES (?, ?, ?)`, [username, hash, name], function(err) {
        if (err) {
          return res.status(500).send('Server error');
        }
        res.json({message: 'User created successfully'});
      });
    });
  });
});



app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return res.status(400).send('Invalid username');
    }
    if (!row) {
      return res.status(400).send('Invalid username');
    }
    bcrypt.compare(password, row.password, function(err, result) {
      if (result) {
        const token = jwt.sign({ id: row.id }, 'your-secret-key', { expiresIn: '1h' });
        res.send({ token });
      } else {
        res.status(400).send('Invalid password');
      }
    });
  });
});



app.post('/doctor-login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  db.get(`SELECT * FROM doctors WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return res.status(400).send('Invalid username');
    }
    if (!row) {
      return res.status(400).send('Invalid username');
    }
    bcrypt.compare(password, row.password, function(err, result) {
      if (result) {
        const token = jwt.sign({ id: row.id }, 'your-secret-key', { expiresIn: '1h' });
        res.send({ token }); 
      } else {
        res.status(400).send('Invalid password');
      }
    });
  });
});




// Function to add doctors to the database
function addDoctors() {
  fs.readFile('doctors.json', 'utf8', (err, data) => {
    if (err) {
      return console.error('Error reading file', err);
    }
    const doctors = JSON.parse(data);

    doctors.forEach(doctor => {
      db.get(`SELECT username FROM doctors WHERE username = ?`, [doctor.username], (err, row) => {
        if (err) {
          return console.error('Database error', err);
        }
        if (row) {
          console.log(`Doctor ${doctor.username} already exists`);
        } else {
          bcrypt.hash(doctor.password, 10, function(err, hash) {
            if (err) {
              return console.error('Bcrypt error', err);
            }

            const newDoctor = { 
                ...doctor, 
                password: hash, 
                id: uuid.v4(),
                languages_spoken: JSON.stringify(doctor.languages_spoken)
            };

            const columns = Object.keys(newDoctor).join(', ');
            const placeholders = Object.keys(newDoctor).map(() => '?').join(', ');
            const sql = `INSERT INTO doctors (${columns}) VALUES (${placeholders})`;

            db.run(sql, Object.values(newDoctor), function(err) {
              if (err) {
                return console.error('Server error', err);
              }
              console.log(`Doctor ${newDoctor.name} added successfully with ID ${newDoctor.id}`);
            });
          });
        }
      });
    });
  });
}




app.get('/doctors', (req, res) => {
  db.all(`SELECT id, name, specialty, rating FROM doctors`, [], (err, rows) => {
    if (err) {
      return res.status(500).send('Server error');
    }

    const doctors = rows.map(row => {
      const { username, password, ...filteredDoctor } = row;
      return filteredDoctor;
    });

    res.json(doctors);
  });
});

//fetch doctor info
app.get('/doctor/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM doctors WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (!row) {
      return res.status(404).send('Doctor not found');
    }

    row.imagePath = `${req.protocol}://${req.get('host')}/images/${row.username}.jpg`;
    res.json(row);
  });
});



app.post('/appointments', (req, res) => {
  const { userId, doctorId, startTime, endTime, description } = req.body;

  db.run(`INSERT INTO appointments(user_id, doctor_id, start_time, end_time, description) VALUES(?, ?, ?, ?, ?)`, [userId, doctorId, startTime, endTime, description], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted into the appointments table with rowid ${this.lastID}`);
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'Appointment created successfully' });
  });
});

app.get('/appointments/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM appointments WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

//fetch user info
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    if (!row) {
      return res.status(404).send('User not found');
    }
    res.json(row);
  });
});

app.get('/appointments/doctor/:doctorId', (req, res) => {
  const { doctorId } = req.params;
  db.all(`SELECT * FROM appointments WHERE doctor_id = ?`, [doctorId], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.send(rows);
  });
});

app.get('/appointments/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;
  db.get(`SELECT * FROM appointments WHERE id = ?`, [appointmentId], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(row);
  });
});


app.put('/appointments/:appointmentId/accept', (req, res) => {
  const { appointmentId } = req.params;
  db.run(`UPDATE appointments SET status = ? WHERE id = ?`, ['accepted', appointmentId], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
    res.json({ message: 'Appointment accepted successfully' });
  });
});

app.delete('/appointments/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;
  db.run(`DELETE FROM appointments WHERE id = ?`, [appointmentId], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted: ${this.changes}`);
    res.json({ message: 'Appointment declined successfully' });
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { app, db };
