import * as fs from "fs";
import * as path from "path";

import { Article } from "./article";

export async function saveArticles(articles: Article[]) {
    const newsDir = path.join(__dirname, "news");
    await fs.promises.mkdir(newsDir, { recursive: true});
    
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const fileName = `(${article.title.replace(/[<>:"/\\|?*]/g, '_')}).txt`;
        const filePath = path.join(newsDir, fileName);

        fs.writeFile(filePath, article.content, (err) => {
            if (err) 
                throw err;
          });
    }
}
