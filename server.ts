import express from "express";
import * as fs from "fs";

export function startServer() {
	const app: express.Express = express();

	// Serve a list of news articles
	app.get("/", (req: express.Request, res: express.Response) => {
		const files = fs.readdirSync("./news");
		const newsFiles = files.filter((filename) =>
			filename.endsWith(".txt")
		);
		const newsList = newsFiles.map(
			(filename) => `<li><a href="/news/${filename}">${filename}</a></li>`
		);
		res.send(`<ul>${newsList.join("")}</ul>`);
	});

	// Serve the text of a news article
	app.get("/news/:filename", (req, res) => {
        const newsDir  = "./news";
		const filename = req.params.filename;
		fs.readFile(`${newsDir}/${filename}`, "utf8", (err, data) => {
			if (err) throw err;
			res.send(data);
		});
	});

	// Start the server
	app.listen(3000, () => {
		console.log("Server started on http://localhost:3000");
	});
}
