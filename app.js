const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 5090
const db = require('./db.js')

app.use(express.json());

app.post('/add', db.createEmployee)
app.get('/all', db.getEmployees)
app.get('/get-byid/:id', db.getEmployeesById)
app.put('/update/:id', db.updateEmployee)
app.delete('/delete/:id', db.deleteEmployee)

app.get('/', (req,res) => {
    res.send("Hello From express")
})

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
})
