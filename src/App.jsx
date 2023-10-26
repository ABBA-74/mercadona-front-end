import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CatalogPage from './pages/Catalog/CatalogPage';
import WishListPage from './pages/WishList/WishListPage';
import LoginPage from './pages/Login/LoginPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/catalogue' element={<CatalogPage />} />
        <Route path='/liste-favoris' element={<WishListPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
