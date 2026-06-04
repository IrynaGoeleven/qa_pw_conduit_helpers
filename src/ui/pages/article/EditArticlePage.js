import { test } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';
import { ViewArticlePage } from './ViewArticlePage';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.createArticlePage = new CreateArticlePage(page);
    this.viewArticlePage = new ViewArticlePage(page);
    this.editArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async editArticleTitle(article) {
    await test.step(`Edit article with title: ${article.title}`, async () => {
      await this.createArticlePage.fillTitleField(article.title);
      await this.editArticleButton.clickEditArticleButton();

      await this.viewArticlePage.assertArticleTitleIsVisible(article.title);
    });
  }

  async editArticleDescription(article) {
    const description = article.description;
    await test.step(
      `Edit article with description: ${description}`,
      async () => {
        await this.createArticlePage.fillDescriptionField(description);
        await this.clickEditArticleButton();

        await this.viewArticlePage.assertArticleDescriptionIsVisible(
          description,
        );
      },
    );
  }

  async editArticleText(article) {
    await test.step(`Edit article with text: ${article.text}`, async () => {
      await this.createArticlePage.fillTextField(article.text);
      await this.clickEditArticleButton();

      await this.viewArticlePage.assertArticleTextIsVisible(article.text);
    });
  }
}
