/* eslint-disable no-undef */
const assert = require('assert');

Feature('Like and Unlike Restoran');

Before(({ I }) => {
  I.amOnPage('/#/Favorit');
});

Scenario('Like And Unlike', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.resto-item a');
  const firstRestoran = locate('.resto-item a').first();
  const firstRestoranTitle = await I.grabTextFrom(firstRestoran);
  I.click(firstRestoran);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/Favorit');
  I.seeElement('.information');

  const likedRestoranTitle = await I.grabTextFrom('.resto__title');

  assert.strictEqual(firstRestoranTitle, likedRestoranTitle);

  I.seeElement('#navigationDrawer', 'a[href="#/favorite"]');
  I.click('a[href="#/favorite"]');

  I.seeElement('.resto-item a');
  const favoritedRestoran = locate('.resto-item a').first();
  const favoritedRestoranTitle = await I.grabTextFrom(favoritedRestoran);

  I.click(favoritedRestoran);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.seeElement('#navigationDrawer', 'a[href="#/favorite"]');
  I.click('a[href="#/favorite"]');

  I.dontSee(favoritedRestoranTitle);
});
