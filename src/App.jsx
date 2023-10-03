import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/Home/HomePage';
import PromotionsPage from './pages/Promotions/PromotionsPage';
import CatalogPage from './pages/Catalog/CatalogPage';
import WishListPage from './pages/WishList/WishListPage';
import LoginPage from './pages/Login/LoginPage';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/promotions' element={<PromotionsPage />} />
        <Route path='/catalogue' element={<CatalogPage />} />
        <Route path='/liste-favoris' element={<WishListPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
