import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: FavoriteRestaurantIdb,
    restaurant,
  });
};
// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithRestaurant };
