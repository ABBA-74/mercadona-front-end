import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DataGrid, frFR } from '@mui/x-data-grid';
import { Box, ThemeProvider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import useWidthCheck from '../../../hooks/useWidthCheck';
import theme from '../theme/dataGridTheme';
import { getProducts } from '../../../api/getProducts';
import { fetchErrorMessage } from '../../../data/errorMessages';
import './ProductList.scss';
import columns from './productGridColumns';

const ProductList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [rowCount, setRowCount] = useState(8);
  const [rowCountState, setRowCountState] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 8,
    page: 0,
  });
  const isWidthAdaptForTable = useWidthCheck(1024);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const { products, totalItems } = await getProducts(page, null, true);
      setData(products);
      setRowCount(totalItems);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', error);
      setError(err);
      if (err.response && err.response.data.code === 401) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (model) => {
    setPaginationModel(model);
    setPage(model.page + 1);
  };

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  /* Fetch Data (products) on mounted phase of the component */
  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <section className='section-products'>
      {error && (
        <section className='section-error-fetch-msg'>
          <ErrorMessage
            title={fetchErrorMessage.title}
            message={fetchErrorMessage.message}
          />
        </section>
      )}
      {data?.length > 0 && isWidthAdaptForTable && (
        <>
          <div className='section-list-products-top-container mb-4'>
            <h3 className='h5'>Liste des produits</h3>
            <Button>
              <AddCircleIcon className='icon-btn-create-item me-2' />
              Créer un produit
            </Button>
          </div>
          <div className='section-list-products-table-container'>
            <ThemeProvider theme={theme}>
              <Box sx={{ height: 547, minWidth: '0', overflowX: 'none' }}>
                <DataGrid
                  className='section-list-products-table'
                  horizontalScrollBarVisibility='Auto'
                  rows={data}
                  columns={columns}
                  loading={isLoading}
                  localeText={
                    frFR.components.MuiDataGrid.defaultProps.localeText
                  }
                  disableRowSelectionOnClick
                  paginationMode='server'
                  rowCount={rowCountState}
                  pageSize={8}
                  pageSizeOptions={[8]}
                  page={paginationModel.page}
                  paginationModel={paginationModel}
                  onPaginationModelChange={handlePageChange}
                />
              </Box>
            </ThemeProvider>
          </div>
        </>
      )}
      {!isLoading && data?.length > 0 && !isWidthAdaptForTable && (
        <>
          <h3 className='h5 mb-4'>Ajustement d&apos;écran recommandé</h3>
          <p>
            Pour une expérience optimale, veuillez utiliser un écran plus grand.
            Nous vous remercions pour votre compréhension.
          </p>
        </>
      )}
    </section>
  );
};

export default ProductList;
