import { NewArticlePage } from '../../pages/article/NewArticlePage';
import { ArticlePage } from '../../pages/article/ArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
  await test.step(`Create new article`, async () => {
    const newArticlePage = new NewArticlePage(page);
    const articlePage = new ArticlePage(page);

    await newArticlePage.open();
    await newArticlePage.submitNewArticleForm(article);

    await articlePage.assertArticleTitleIsVisible(article.title);
  });
}
