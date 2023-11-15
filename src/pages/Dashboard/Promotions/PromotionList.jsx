import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { DataGrid, frFR } from '@mui/x-data-grid';
import { Box, ThemeProvider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Loader from '../../../components/Loader/Loader';
import useWidthCheck from '../../../hooks/useWidthCheck';
import theme from '../theme/dataGridTheme';
import { getPromotions } from '../../../api/getPromotions';
import { fetchErrorMessage } from '../../../data/errorMessages';
import ScreenAdjustmentNotification from '../ScreenAdjustmentNotification/ScreenAdjustmentNotification';
import PromotionColumnsGenerator from './PromotionColumnsGenerator';
import { useAuthLogout } from '../../../hooks/useAuthLogout';

const PromotionsList = () => {
  const { logout } = useAuthLogout();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [rowCount, setRowCount] = useState(8);
  const [rowCountState, setRowCountState] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [refreshDataGrid, setRefreshDataGrid] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 8,
    page: 0,
  });
  const isWidthAdaptForTable = useWidthCheck(1024);

  const columnsMemo = useMemo(
    () => PromotionColumnsGenerator(rowId, setRefreshDataGrid, setPage),
    [rowId]
  );

  const fetchpromotions = async () => {
    try {
      setIsLoading(true);
      const { promotions, totalItems } = await getPromotions(page);
      setData(promotions);
      setRowCount(totalItems);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des données', error);
      setError(err);
      if (err.response && err.response.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
      if (isFirstLoading === true) {
        setIsFirstLoading(false);
      }
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

  useEffect(() => {
    if (refreshDataGrid) {
      handlePageChange({
        pageSize: 8,
        page: 0,
      });
      setRefreshDataGrid(false);
    }
    fetchpromotions();
  }, [page]);

  return (
    <section className='section-promotion-list'>
      {isFirstLoading && (
        <section className='section-loader'>
          <Loader />
        </section>
      )}
      {error && (
        <section className='section-error-fetch-msg'>
          <ErrorMessage
            title={fetchErrorMessage.title}
            message={fetchErrorMessage.message}
          />
        </section>
      )}
      {!error && data?.length > 0 && isWidthAdaptForTable && (
        <>
          <div className='section-promotion-list-header mb-4'>
            <h3 className='h5'>Liste des promotions</h3>
            <Button as={Link} to='/dashboard/promotions/creation'>
              <AddCircleIcon className='icon-btn-create-item me-2' />
              Créer une promotion
            </Button>
          </div>
          <div className='section-promotion-list-table-container'>
            <ThemeProvider theme={theme}>
              <Box sx={{ height: 547, minWidth: '0', overflowX: 'none' }}>
                <DataGrid
                  className='section-promotion-list-table'
                  horizontalScrollBarVisibility='Auto'
                  rows={data}
                  columns={columnsMemo}
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
                  onCellClick={(params) => setRowId(params.id)}
                />
              </Box>
            </ThemeProvider>
          </div>
        </>
      )}
      {!isLoading && data?.length > 0 && !isWidthAdaptForTable && (
        <ScreenAdjustmentNotification />
      )}
    </section>
  );
};

export default PromotionsList;
