import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.fillTagField(faker.lorem.word());
  await createArticlePage.clickPublishArticleButton();
});

test('Add the tag for the existing article with tags', async () => {
  const tag = faker.lorem.word();
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTagField(tag);
  await editArticlePage.clickEditArticleButton();
  await viewArticlePage.clickUserProfile();

  await viewArticlePage.assertArticleTagIsVisible(tag);
});
