import axios from 'axios';

const categoryWithType = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((resp) => {
      const { types } = resp.data;
      const categoriesWithTypes = categories.map((category) => {
        const newObject = category;
        const matchingTypes = types.filter(type => type.category === category.id);
        newObject.types = matchingTypes;
        return newObject;
      });
      resolve(categoriesWithTypes);
    })
    .catch(err => reject(err));
});

export default { categoryWithType };
