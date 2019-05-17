import categoryData from '../helpers/data/categoriesData';
import typesData from '../helpers/data/typesData';
import productData from '../helpers/data/productsData';

// const formatInfo = (info) => {
//   console.error('info coming in', info);
//   const arrayToPrint = [];
//   info.forEach((category) => {
//     // const newFilter = category.filter(aCategory => aCategory.id === aCategory.types[])
//     const newObject = Object.create(info);
//     newObject.categoryId = category.id;
//     newObject.categoryName = category.name;
//     category.types.forEach((type) => {
//       newObject.typeId = type.id;
//     });
//     // const newObject = {
//     //   categoryId: '',
//     //   categoryName: '',
//     //   typeId: '',
//     //   typeName: '',
//     //   productName: '',
//     //   productDescription: '',
//     // };
//     arrayToPrint.push(newObject);
//   });
//   console.error('arrayToPrint', arrayToPrint);
// };

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
