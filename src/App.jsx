import { Route, Routes } from 'react-router-dom';
import useAuthRedirect from './hooks/useAuthRedirect';

import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/Home/HomePage';
import CatalogPage from './pages/Catalog/CatalogPage';
import WishListPage from './pages/WishList/WishListPage';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import HomeDashboard from './pages/Dashboard/Home/HomeDashboard';
import CategoryList from './pages/Dashboard/Categories/CategoryList';
import ImageList from './pages/Dashboard/Images/ImageList';
import ProductList from './pages/Dashboard/Products/ProductList';
import PromotionList from './pages/Dashboard/Promotions/PromotionList';
import UserList from './pages/Dashboard/Users/UserList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/dashboard/*'
          element={useAuthRedirect(DashboardPage, [
            'ROLE_SUPER_ADMIN',
            'ROLE_ADMIN',
          ])}
        >
          <Route index element={<HomeDashboard />} />
          <Route path='categories' element={<CategoryList />} />
          <Route path='images' element={<ImageList />} />
          <Route path='produits' element={<ProductList />} />
          <Route path='promotions' element={<PromotionList />} />
          <Route path='utilisateurs' element={<UserList />} />
        </Route>
        <Route path='/catalogue' element={<CatalogPage />} />
        <Route path='/liste-favoris' element={<WishListPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
