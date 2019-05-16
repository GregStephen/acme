import 'bootstrap';
import '../styles/main.scss';
import products from './components/productsPage';

const init = () => {
  products.initCategories();
};

init();
