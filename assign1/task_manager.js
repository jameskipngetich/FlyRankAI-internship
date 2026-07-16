const express = require('express');
const app = express();

const port = 8080;
const hostname = '127.0.0.1';

// middleware for parsing json
app.use(express.json());

// GET /   api description
app.get('/', (req, res) => {
	res.status(200);
	res.json({ "name" : "Task API", "Version" : "1.0", "endpoints": ["/task","/health"]});
});


// GET /health
app.get('/health', (req,res) => {
	res.status(200);
	res.json({"Status" : "OK"});
});

// start the server
app.listen( port, hostname, () => {
	console.log(`Task API is listening at http://${hostname}:${port}/`);
});
