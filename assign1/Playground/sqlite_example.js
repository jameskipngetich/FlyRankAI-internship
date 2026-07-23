// This is an example to know how Node js interacts with sqlite

const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('./tasks.db');

// execute sql statements from string

/*database.exec(`
	CREATE TABLE tasks(
		id INT PRIMARY KEY,
		name TEXT,
		description TEXT,
		done BOOLEAN
	) 
`);*/
// Prepare a statement to insert values into the table
const insert = database.prepare('INSERT INTO tasks(id,name,description,done) values(?,?,?,?)');
//Execute the prepared statement
insert.run(1,'Workout','Do some morning exercise',1);
insert.run(2,'Breakfast','Have some breakfast',0);

//create a prepared statement to read from the table
const query = database.prepare('SELECT * FROM tasks ORDER BY id');
//Execute the prepared statement and log the result
console.log(query.all());
