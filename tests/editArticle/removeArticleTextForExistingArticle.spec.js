import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

let homePage;
let createArticlePage;
let viewArticlePage;
let editArticlePage;
let article;
let tag;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  viewArticlePage = new ViewArticlePage(page);
  editArticlePage = new EditArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();
  tag = faker.lorem.word();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.fillTagField(tag);
  await createArticlePage.clickPublishArticleButton();
});

test('Remove the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTextField('');
  await editArticlePage.clickEditArticleButton();

  await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
