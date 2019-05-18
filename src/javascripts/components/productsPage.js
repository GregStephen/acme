import categoryData from '../helpers/data/categoriesData';
import typesData from '../helpers/data/typesData';
import productData from '../helpers/data/productsData';
import util from '../helpers/util';

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
    .then(resp => typesData.categoryWithType(resp.data.categories))
    .then(categoriesWithTypes => productData.typeWithProducts(categoriesWithTypes))
    .then((typeWithProducts) => {
      domStringBuiler(typeWithProducts);
    })
    .catch(err => console.error('error from loadCategories', err));
};

export default { initCategories };
