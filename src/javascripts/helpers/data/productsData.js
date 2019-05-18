import axios from 'axios';

const typeWithProducts = catWithTypes => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((resp) => {
      const { products } = resp.data;
      const productValues = [];
      for (let p = 0; p < products.length; p += 1) {
        const newProductValues = Object.values(products[p]);
        productValues.push(newProductValues[0]);
      }
      const typesWithProducts = [];
      catWithTypes.forEach((categoryWithType) => {
        const matchingProds = productValues.filter(prod => prod.type === categoryWithType.typeId);
        matchingProds.forEach((product) => {
          const newerObject = {};
          newerObject.categoryId = categoryWithType.categoryId;
          newerObject.categoryName = categoryWithType.categoryName;
          newerObject.typeId = categoryWithType.typeId;
          newerObject.typeName = categoryWithType.typeName;
          newerObject.productName = product.name;
          newerObject.productDescription = product.description;
          typesWithProducts.push(newerObject);
        });
      });
      resolve(typesWithProducts);
    })
    .catch(err => reject(err));
});
export default { typeWithProducts };
