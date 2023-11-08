import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useCrudNotification from '../../../hooks/useCrudNotification';
import { deleteItem } from '../../../api/deleteItem';
import { scrollTo } from '../../../utils/scrollTo';
import './BtnsActionsCrud.scss';

const BtnsActionsCrud = ({
  params,
  rowId,
  setPage,
  setRefreshDataGrid,
  hideDeleteBtn,
}) => {
  const { showNotification } = useCrudNotification();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRefreshDataGrid = () => {
    setPage(1);
    setRefreshDataGrid(true);
    scrollTo(0, 0);
  };

  const handleEditItem = () => {
    // showNotification('info', 'Opération réussie !');
    handleRefreshDataGrid();
    let baseDashboardItemUrl = '';
    switch (true) {
      case params.row['@id'].includes('products'):
        baseDashboardItemUrl = '/dashboard/produits';
        break;
      case params.row['@id'].includes('categories'):
        baseDashboardItemUrl = '/dashboard/categories';
        break;
      case params.row['@id'].includes('users'):
        baseDashboardItemUrl = '/dashboard/utilisateurs';
        break;
      case params.row['@id'].includes('promotions'):
        baseDashboardItemUrl = '/dashboard/promotions';
        break;
      default:
        break;
    }
    const dashboardEditItemUrl = `${baseDashboardItemUrl}/${params.id}/modifier`;

    navigate(dashboardEditItemUrl, { replace: true });
  };

  const handleDeleteItem = async () => {
    const itemUrl = params.row['@id'];
    try {
      setIsLoading(true);
      const response = await deleteItem(itemUrl);
      if (response.status === 204) {
        handleRefreshDataGrid();
      }
      showNotification('info', response.message);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', err);
      showNotification(
        'error',
        "La suppression de l'élément a échoué. Veuillez réessayer."
      );
      if (err.response && err.response.data.code === 401) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className='btn btn-primary btn-actions-crud btn-edit'
        disabled={isLoading}
        onClick={handleEditItem}
      >
        <EditIcon className='icon-btn-actions' />
      </button>

      {!hideDeleteBtn && (
        <button
          className='btn btn-danger btn-actions-crud btn-delete'
          disabled={isLoading}
          onClick={handleDeleteItem}
        >
          {isLoading && params.id === rowId ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            <DeleteIcon className='icon-btn-actions' />
          )}
        </button>
      )}
    </>
  );
};

BtnsActionsCrud.propTypes = {
  params: PropTypes.object.isRequired,
  rowId: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  setRefreshDataGrid: PropTypes.func.isRequired,
  hideDeleteBtn: PropTypes.bool,
};

BtnsActionsCrud.defaultProps = {
  hideDeleteBtn: false,
};

export default BtnsActionsCrud;
