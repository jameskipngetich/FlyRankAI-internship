const express = require('express');
const app = express();

const port = 8080;
const hostname = '127.0.0.1';

// middleware for parsing json
app.use(express.json());

//in-memory list of tasks
let tasks = [
	{ id: 1, name: 'Security audit', description: 'Go through overnight security logs', done:'True'},
	{ id: 2, name: 'Sprint meeting', description: 'Provide overnight security report at the sprint meeting', done:'False'},
	{ id: 3, name: 'Bruteforce alert script', description: 'Write, test and deploy a scrip to alert incase of password bruteforce attack to the system', done:'False'}
];

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

// GET /task
app.get('/tasks', (req,res) => {
	res.json(tasks);
	res.status(200);
});

// GET /tasks/:id
app.get('/tasks/:id', (req,res) => {
	const task = tasks.find(t => t.id === parseInt(req.params.id));
	if (!task) return res.status(404).json({ "error" : `Task ${req.params.id} N O T  F O U N D`});
	res.json(task);
});

// POST - add a task
app.post('/tasks', (req,res) => {
	if (!req.body.name) return res.status(422).json({ "error" : "Task to be created needs a name"});
	const newTask = {
		id: tasks.length + 1 ,
		name: req.body.name,
		description: req.body.description,
		done: 'False'
	};
	tasks.push(newTask);
	res.status(201).json(newTask);
});

//PUT -update
app.put('/tasks/:id', (req,res) => {
	const task = tasks.find(t => t.id === parseInt(req.params.id));
	if (!task) return res.status(404).json({ "error" : `Task ${req.params.id} N O T  F O U N D`});
	task.name = req.params.name;
	task.description = req.params.description;
	task.done = req.params.done;
	res.status(200).json(task);
});

//DELETE
app.delete('/tasks/:id', (req,res) => {
	const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
	if (taskIndex === -1 ) return res.status(404).json({ "error" : `Task ${req.params.id} N O T  F O U N D`});
	const deletedTask = tasks.splice(taskIndex, 1);
	res.status(204).send("No Content - Success nothing to say");
	res.json(deletedTask[0]);
});

// start the server
app.listen( port, hostname, () => {
	console.log(`Task API is listening at http://${hostname}:${port}/`);
});
