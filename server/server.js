
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // Add body-parser
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Your other routes and middleware...
app.post('/api/data', (req, res) => {
    const data = req.body;
    console.log("data")
    console.log('Received data:', data);
    res.json({ message: 'Data received successfully!' }); // Send JSON response
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
