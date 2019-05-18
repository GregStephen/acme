import $ from 'jquery';
import categoryData from '../helpers/data/categoriesData';
import typesData from '../helpers/data/typesData';
import productData from '../helpers/data/productsData';
import util from '../helpers/util';
import './_products.scss';

let arrayOfCats = [];

const buttonMaker = (arrayOfCategories) => {
  let domString = '';
  domString += '<button class="btn btn-info dropdown-toggle" type="button"';
  domString += 'id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
  domString += 'Products';
  domString += '</button>';
  domString += '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
  arrayOfCategories.forEach((category) => {
    domString += `<a class="dropdown-item ${category.name}" id="${category.id}" href="#">${category.name}</a>`;
  });
  domString += '<div class="dropdown-divider"></div>';
  domString += '<a class="dropdown-item" id="showAll" href="#">Show All</a>';
  domString += '</div>';
  util.printToDom('dropdownButton', domString);
};

const domStringBuiler = (arrayOfInfo) => {
  let domString = '';
  arrayOfInfo.forEach((product) => {
    domString += '<div class="d-md-flex col-12 col-md-6 col-lg-3 mb-3">';
    domString += `<div class="card align-self-stretch product-card ${product.categoryName} ${product.categoryId} ${product.typeId}">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title product-name">${product.productName}</h5>`;
    domString += '<hr>';
    domString += `<p class="card-text category-name">Category: ${product.categoryName}</p>`;
    domString += `<p class="card-text type-name ${product.typeName}">Type: ${product.typeName}</p>`;
    domString += `<p class="card-text product-description">Description: ${product.productDescription}</p>`;
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
  let title = '';
  if (e.target.id === 'showAll') {
    categoryArray = arrayOfCats;
    title = '<h2>All Products</h2>';
  } else {
    categoryArray = arrayOfCats.filter(cat => cat.id === e.target.id);
    title = `<h2>${categoryArray[0].name}</h2>`;
  }
  util.printToDom('pageTitle', title);
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
