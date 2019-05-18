import $ from 'jquery';
import categoryData from '../helpers/data/categoriesData';
import typesData from '../helpers/data/typesData';
import productData from '../helpers/data/productsData';
import util from '../helpers/util';

let arrayOfCats = [];

const buttonMaker = (arrayOfCategories) => {
  let domString = '';
  domString += '<button class="btn btn-secondary dropdown-toggle" type="button"';
  domString += 'id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
  domString += 'Selections';
  domString += '</button>';
  domString += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
  arrayOfCategories.forEach((category) => {
    domString += `<a class="dropdown-item" id="${category.id}" href="#">${category.name}</a>`;
  });
  domString += '<div class="dropdown-divider"></div>';
  domString += '<a class="dropdown-item" id="showAll" href="#">Show All</a>';
  domString += '</div>';
  util.printToDom('dropdownButton', domString);
};

const domStringBuiler = (arrayOfInfo) => {
  let domString = '';
  arrayOfInfo.forEach((product) => {
    domString += '<div class="col-3 mb-3">';
    domString += `<div class="card ${product.categoryId} ${product.typeId}">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${product.productName}</h5>`;
    domString += `<p class="card-text">Category: ${product.categoryName}</p>`;
    domString += `<p class="card-text">Type: ${product.typeName}</p>`;
    domString += `<p class="card-text">Description: ${product.productDescription}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('productsPage', domString);
};

const initCategories = () => {
  categoryData.loadCategories()
    .then((resp) => {
      arrayOfCats = resp.data.categories;
      buttonMaker(resp.data.categories);
    })
    .catch(err => console.error('error from loadCategories', err));
};

const showProducts = (e) => {
  let categoryArray = [];
  if (e.target.id === 'showAll') {
    categoryArray = arrayOfCats;
  } else {
    const categoryObj = {
      id: e.target.id,
      name: e.target.innerText,
    };
    categoryArray.push(categoryObj);
  }
  typesData.categoryWithType(categoryArray)
    .then(categoriesWithTypes => productData.typeWithProducts(categoriesWithTypes))
    .then((typeWithProducts) => {
      domStringBuiler(typeWithProducts);
    })
    .catch(err => console.error('error from initCategories', err));
};

const addEventListeners = () => {
  $('.dropdown').on('click', '.dropdown-item', showProducts);
};

export default { initCategories, addEventListeners };
