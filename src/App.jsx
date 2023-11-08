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
import ProductList from './pages/Dashboard/Products/ProductList';
import PromotionList from './pages/Dashboard/Promotions/PromotionList';
import UserEdit from './pages/Dashboard/Users/UserEdit';
import UserList from './pages/Dashboard/Users/UserList';
import Footer from './components/Footer/Footer';
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
