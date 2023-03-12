import { startServer } from "./server";
import { scrapeNews } from "./scraper";
import { Article } from "./article";
import { saveArticles } from "./saveArticles";

async function main() {
	let newsSiteLink: string = "https://www.rbc.ua/rus/news";

	// Fetch news on start
    let articles: Article[] = await scrapeNews(newsSiteLink);

    // Save articles fetched on start
    await saveArticles(articles);

    // Repeat fetching and saving news every minute
    setInterval(
        async () => {
            let newArticles: Article[] = await scrapeNews(newsSiteLink);

            // Filter out articles that are already saved
            newArticles = newArticles.filter(
                (article) => !articles.find((a) => a.title === article.title)
            );

            // Save new articles
            if (newArticles.length > 0) {
                await saveArticles(newArticles);

                // Update articles array
                articles.push(...newArticles);
            }
        },
        60 * 1000
    );

	// Start the web server
	startServer();
}

main();
