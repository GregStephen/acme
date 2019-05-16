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
      const typesWithProducts = catWithTypes.map((cats) => {
        const newerObject = cats;
        for (let i = 0; i < newerObject.types.length; i += 1) {
          const matchingProds = productValues.filter(prod => prod.type === newerObject.types[i].id);
          newerObject.types[i].products = matchingProds;
          console.error('newwerObj', newerObject);
        }
        return newerObject;
      });
      resolve(typesWithProducts);
    })
    .catch(err => reject(err));
});
export default { typeWithProducts };
