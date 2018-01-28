const shelljs = require("shelljs");
const fs = require ("fs");
const os = require("os");
const path = require("path");
const commander = require("commander")
	.option("-c, --creator [creator]", "The name of the archive creator you are wanting to search for", null)
	.option("-f, --file [file]", "The name of the file you want the results saved to", "results.txt")
	.option("-p, --path [path]", "The directory that you want to save the files to", `${os.homedir()}/Downloads`)
	.option("-o, --overwrite", "This will overwrite the generated file. Without this flag, results will be appended", false)
	.option("-e, --enddate [end date]", "The ending date for your search range, ex: 2000-03-11", "*")
	.option("-s, --startdate [start date]", "The start date for your search range, ex: 2000-03-09", "*")
	.parse(process.argv);

function validDate(value) {
	if (value === "*") { return true; }
	return !!value.match(/\d{4}\-\d{2}\-\d{2}/);
}

let errors = [];

if (!fs.existsSync(commander.path)) {
	errors.push(`\n\t* Path specified does not exist. Please create the folder structure ${commander.path} or specify a folder already created`);
}

if (!commander.creator) {
	errors.push("\n\t* You must specify a creator.");
}

if (!validDate(commander.startdate)) {
	errors.push("\n\t* Invalid date format for start date. Format must be YYYY-MM-DD.");
}

if (!validDate(commander.enddate)) {
	errors.push("\n\t* Invalid date format for ending date. Format must be YYYY-MM-DD.");
}

if (errors.length) {
	console.log("\nErrors were found. Enter node fetch-shows -h for help.");
	errors.forEach(item => console.log(item));
	console.log("\nTerminating...\n");
	return;
}

const responseHtml = shelljs.exec(`wget -qO- "https://archive.org/advancedsearch.php?q=+creator%3A%28${commander.creator}%29+AND+source%3A%28sbd%29+AND+date%3A%5B${commander.startdate}+TO+${commander.enddate}%5D&fl%5B%5D=identifier&sort%5B%5D=date+asc&sort%5B%5D=&sort%5B%5D=&rows=500&page=1&output=json&callback=callback&save=yes"`).stdout;

const shows = JSON.parse(`${responseHtml.split("\"docs\":")[1].split("]")[0]}]`).map((item) => {
	return `https://archive.org/details/${item.identifier}`;
});

console.log(`\n\nFound ${shows.length} for ${commander.creator}\n`);

if (commander.overwrite) {
	fs.writeFileSync(path.join(commander.path, commander.file), shows.join("\n"));
} else {
	fs.appendFileSync(path.join(commander.path, commander.file), shows.join("\n"));
}
