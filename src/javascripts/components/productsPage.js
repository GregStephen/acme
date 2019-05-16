import categoryData from '../helpers/data/categoriesData';
import typesData from '../helpers/data/typesData';
import productData from '../helpers/data/productsData';

const initCategories = () => {
  categoryData.loadCategories()
    .then(resp => typesData.categoryWithType(resp.data.categories))
    .then(categoriesWithTypes => productData.typeWithProducts(categoriesWithTypes))
    .then((typeWithProducts) => {
      console.error(typeWithProducts);
    })
    .catch(err => console.error('error from loadCategories', err));
};

export default { initCategories };
