import axios from 'axios';

const categoryWithType = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((resp) => {
      const { types } = resp.data;
      const categoriesWithTypes = [];
      categories.forEach((category) => {
        const matchingTypes = types.filter(type => type.category === category.id);
        matchingTypes.forEach((type) => {
          const newObject = {};
          newObject.categoryId = category.id;
          newObject.categoryName = category.name;
          newObject.typeId = type.id;
          newObject.typeName = type.name;
          categoriesWithTypes.push(newObject);
        });
      });
      resolve(categoriesWithTypes);
    })
    .catch(err => reject(err));
});

export default { categoryWithType };
