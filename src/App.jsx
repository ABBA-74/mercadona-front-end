import { Route, Routes } from 'react-router-dom';
import useAuthRedirect from './hooks/useAuthRedirect';

import CatalogPage from './pages/Catalog/CatalogPage';
import CategoryEdit from './pages/Dashboard/Categories/CategoryEdit';
import CategoryList from './pages/Dashboard/Categories/CategoryList';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Footer from './components/Footer/Footer';
import HomeDashboard from './pages/Dashboard/Home/HomeDashboard';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import Navigation from './components/Navigation/Navigation';
import ProductList from './pages/Dashboard/Products/ProductList';
import PromotionList from './pages/Dashboard/Promotions/PromotionList';
import UserEdit from './pages/Dashboard/Users/UserEdit';
import UserList from './pages/Dashboard/Users/UserList';
import WishListPage from './pages/WishList/WishListPage';
import { CrudNotificationProvider } from './contexts/CrudNotificationProvider';

function DashboardRoutes() {
  const authComponent = useAuthRedirect(DashboardPage, [
    'ROLE_SUPER_ADMIN',
    'ROLE_ADMIN',
  ]);
  return <CrudNotificationProvider>{authComponent}</CrudNotificationProvider>;
}

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard/*' element={<DashboardRoutes />}>
          <Route index element={<HomeDashboard />} />
          <Route path='categories' element={<CategoryList />} />
          <Route path='produits' element={<ProductList />} />
          <Route path='promotions' element={<PromotionList />} />
          <Route path='utilisateurs' element={<UserList />} />
          <Route path='utilisateurs/:id/modifier' element={<UserEdit />} />
          <Route path='categories/:id/modifier' element={<CategoryEdit />} />
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
