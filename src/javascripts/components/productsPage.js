import $ from 'jquery';
import categoryData from '../helpers/data/categoriesData';
import typesData from '../helpers/data/typesData';
import productData from '../helpers/data/productsData';
import util from '../helpers/util';

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
  domString += '</div>';
  util.printToDom('dropdownButton', domString);
};

const domStringBuiler = (arrayOfInfo) => {
  let domString = '';
  arrayOfInfo.forEach((product) => {
    console.error('product', product);
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
      buttonMaker(resp.data.categories);
    })
    .catch(err => console.error('error from loadCategories', err));
};


const showProducts = (e) => {
  const categoryObj = {
    id: e.target.id,
    name: e.target.innerText,
  };
  typesData.categoryWithType(categoryObj)
    .then(categoriesWithTypes => productData.typeWithProducts(categoriesWithTypes))
    .then((typeWithProducts) => {
      domStringBuiler(typeWithProducts);
    })
    .catch(err => console.error('error from initCategories', err));
};

// const initCategories = () => {
//   categoryData.loadCategories()
//     .then(resp => typesData.categoryWithType(resp.data.categories))
//     .then(categoriesWithTypes => productData.typeWithProducts(categoriesWithTypes))
//     .then((typeWithProducts) => {
//       domStringBuiler(typeWithProducts);
//     })
//     .catch(err => console.error('error from initCategories', err));
// };

const addEventListeners = () => {
  $('.dropdown').on('click', '.dropdown-item', showProducts);
};
export default { initCategories, addEventListeners };
