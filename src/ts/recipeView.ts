import { Recipe } from './types';

class RecipeInfo {
	private parentElement;

	constructor() {
		this.parentElement = document.querySelector('.recipe-info') as HTMLDivElement;
	}
	clear() {
		this.parentElement.innerHTML = '';
	}
	showPanel() {
		document.body.style.overflow = 'hidden';
		this.parentElement.style.display = 'block';
	}
	closePanel() {
		document.body.style.overflowY = 'auto';
		(document.querySelector('.recipe-info') as HTMLElement).style.display = 'none';
	}
	generateList(recipe: Recipe) {
		const list = recipe.ingredients?.map((el) => {
			return `
            <li class="recipe-info__ingredient">
            <i class="fa-solid fa-check"></i>
            <div class="recipe-info__quantity">${!el.quantity ? '' : el.quantity}</div>
            <div class="recipe-info__description">
              <span class="recipe-info__unit">${el.unit}</span>
              ${el.description}
            </div>
            </li>
          `;
		});
		return list?.join('');
	}
	renderResults(recipe: Recipe) {
		const list = this.generateList(recipe);
		const markup = `
        <div class="recipe-info__top">
        <img class="recipe-info__img" src="${recipe.image_url}" alt="${recipe.title}">
        <div class="recipe-info__shadow">
        <button class="btn recipe-info__back"><i class="fa-solid fa-right-to-bracket"></i></button>
          <h2 class="recipe-info__title">${recipe.title}</h2>
        </div>
      </div>
      <div class="wrapper">
      
        <div class="recipe-info__details">
          <div class="recipe-info__details-left">
            <div class="recipe-info__time-box">
              <i class="fa-regular fa-clock"></i>
              <p class="recipe-info__time">${recipe.cooking_time} minutes</p>
            </div>
            <div class="recipe-info__servings-box">
              <i class="fa-solid fa-user-group"></i>
              <p class="recipe-info__servings">${recipe.servings} servings</p>
            </div>
          </div>
          <div class="recipe-info__details-right">
            <button class="recipe-info__btn btn btn--heart"><i class="fa-regular fa-heart"></i></button>
          </div>
        </div>
      </div>
      <div class="bgc-color  bgc-color--faded-white">
        <div class="wrapper">
          <h3 class="title title--blue recipe-info__body-title">Recipe ingredients</h3>
          <div class="recipe-info__ingredients-box">
            <ul class="recipe-info__ingredient-list">
                ${list}
            </ul>
          </div>
        </div>
      </div>
      <div class="recipe-info__bottom">
        <div class="wrapper">
          <h4 class="title title--blue recipe-info__body-title">How to cook it</h4>
          <p class="recipe-info__text">This recipe was carefully designed and tested by <span>${recipe.publisher}</span>. Please
            check out
            directions at their website.</p>
          <a class="recipe-info__go-to" target="_blank" href="${recipe.source_url}">Directions</a>
        </div>
      </div>
       `;

		this.parentElement.insertAdjacentHTML('beforeend', markup);
		const closeBtn = document.querySelector('.recipe-info__back') as HTMLButtonElement;
		closeBtn.addEventListener('click', this.closePanel);
	}
}

export const recipeInfo = new RecipeInfo();