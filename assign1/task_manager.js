const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const port = 8080;
const hostname = '127.0.0.1';

// middleware for parsing json
app.use(express.json());

// configuring swagger-ui for api documentation
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title : "Task Manager API",
			version: "1.0",
			description: "A simple REST API to manage tasks"
		},
		servers: [
			{
				url:"http://127.0.0.1:8080"
			}
		]
	},
	apis: ["./task_manager.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec)
);

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

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health checks
 *     description: Checks if the API is running.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API is healthy
 */
// GET /health
app.get('/health', (req,res) => {
	res.status(200);
	res.json({"Status" : "OK"});
});

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *        200:
 *          description: Returns all tasks
 */
// GET /task
app.get('/tasks', (req,res) => {
	res.status(200).json(tasks);
});

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by id
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: interger
 *         description: Task id
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 *
 */
// GET /tasks/:id
app.get('/tasks/:id', (req,res) => {
	const task = tasks.find(t => t.id === parseInt(req.params.id));
	if (!task) return res.status(404).json({ "error" : `Task ${req.params.id} N O T  F O U N D`});
	res.json(task);
});

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *       422:
 *         description: Missing task name
 */
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

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
//PUT -update
app.put('/tasks/:id', (req,res) => {
	const task = tasks.find(t => t.id === parseInt(req.params.id));
	if (!task) return res.status(404).json({ "error" : `Task ${req.params.id} N O T  F O U N D`});
	task.name = req.body.name ?? task.name;
	task.description = req.body.description ?? task.description;
	task.done = req.body.done ?? task.done;
	res.status(200).json(task);
});

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
//DELETE
app.delete('/tasks/:id', (req,res) => {
	const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
	if (taskIndex === -1 ) return res.status(404).json({ "error" : `Task ${req.params.id} N O T  F O U N D`});
	const deletedTask = tasks.splice(taskIndex, 1);
	res.status(204).send("No Content - Success nothing to say");

});

// start the server
app.listen( port, hostname, () => {
	console.log(`Task API is listening at http://${hostname}:${port}/`);
});
