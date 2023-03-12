import axios from "axios";
import cheerio from "cheerio";

import { Article } from "./article";

export async function scrapeNews(newsSiteLink: string): Promise<Article[]> {
	const response = await axios.get(newsSiteLink);
	const $ = cheerio.load(response.data);

    const articles: Article[] = [];

	for (const div of $(".newsline > div")) {
		const href = $(div).find("a").attr("href");
		const title = $(div)
			.find("a")
			.clone()
			// Select and remove <span>
			.children()
			.remove()
			.end()
			// Extract title and trim it
			.text()
			.trim();

		if (!href) {
			throw new Error("href is undefined");
		}

		let contentResponse = await axios.get(href);

		const content$ = cheerio.load(contentResponse.data);
		const content = content$(".middle-col .txt").text().trim();

		articles.push({ title, content });
	}

	return articles;
}
