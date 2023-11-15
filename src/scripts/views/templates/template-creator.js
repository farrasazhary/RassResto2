import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="resto-item">
  <div class="resto-item__header">
    <img class="lazyload resto-item__header__poster" alt="${restaurant.name}"
         data-src="${restaurant.pictureId ? CONFIG.BASE_IMG_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" crossorigin="anonymous" >
    <div class="resto-item__header__rating">
      <p>⭐️<span class="resto-item__header__rating__score">${restaurant.rating}</span></p>
    </div>
  </div>
  <div class="resto-item__content">
    <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
    <p class="resto-city">${restaurant.city}</p>
    <p>${restaurant.description}</p>
  </div>
</div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="detail-information">
        <h1 class="resto__title">${restaurant.name}</h1>
        <img class="resto__poster" src="${restaurant.pictureId ? CONFIG.BASE_IMG_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurant.name} "
            alt="${restaurant.name}" crossorigin="anonymous"/>
        <div class="information">
            <div class="resto__info">
                <h1 class="information-title">INFORMATION</h1>
                <div class="information-resto">
                    <P class="info-resto">Kota : ${restaurant.city}</P>
                    <P class="info-resto">Alamat : ${restaurant.address}</P>
                    <P class="info-resto">Kategori : ${restaurant.categories.map((category) => category.name).join(' & ')}</P>
                    <P class="info-resto">Rating :  ${restaurant.rating}</P>
                </div>
            </div>
            <div class="resto__description">
                <h1>Description</h1>
                <p>${restaurant.description}</p>
            </div>

            <div class="food-menu">
                <h1>Food Menu</h1>
                <p>${restaurant.menus.foods.map((food) => food.name).join(' | ')}</p>
            </div>

            <div class="drink-menu">
                <h1>Drink Menu</h1>
                <p>${restaurant.menus.drinks.map((drink) => drink.name).join(' | ')}</p>
            </div>

            <div class="review">
                <h1>Review</h1>
                ${restaurant.customerReviews.map((review) => `
                <div class="card-review">
                      <p>${review.name}</p> 
                      <p>(${review.date})</p> 
                      <p>"${review.review}"</p>
                </div>
                    `).join('')}
            </div>
        </div>
    </div>
`;

const createRestoLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createRestoUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate,
  createRestoLikeButtonTemplate, createRestoUnlikeButtonTemplate,
};
