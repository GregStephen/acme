import axios from 'axios';

const categoryWithType = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((resp) => {
      const { types } = resp.data;
      const categoriesWithTypes = [];
      const style = {};
      const newObject = Object.create(style);
      categories.forEach((category) => {
        console.error('category', category);
        const matchingTypes = types.filter(type => type.category === category.id);
        matchingTypes.forEach((type) => {
          console.error('type', type);
          newObject.categoryId = category.id;
          newObject.categoryName = category.name;
          newObject.typeId = type.id;
          newObject.typeName = type.name;
          console.error('newObj', newObject);
          categoriesWithTypes.push(newObject);
        });
      });
      console.error('catWIthTypes', categoriesWithTypes);
      resolve(categoriesWithTypes);
    })
    .catch(err => reject(err));
});

export default { categoryWithType };
