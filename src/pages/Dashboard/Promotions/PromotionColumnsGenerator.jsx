import moment from 'moment/moment';
import BtnsActionsCrud from '../BtnsActionsCrud/BtnsActionsCrud';

const PromotionColumnsGenerator = (rowId, setRefreshDataGrid, setPage) => {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      hideable: false,
      flex: 0.6,
    },
    {
      field: 'startDate',
      headerName: 'Date de début',
      flex: 1.5,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.startDate
              ? `${moment(params.row.startDate).format('DD/MM/YYYY HH:MM:SS')}`
              : `-`}
          </>
        );
      },
    },
    {
      field: 'endDate',
      headerName: 'Date de fin',
      flex: 1.5,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.endDate
              ? `${moment(params.row.endDate).format('DD/MM/YYYY HH:MM:SS')}`
              : `-`}
          </>
        );
      },
    },
    {
      field: 'discountPercentage',
      headerName: 'Remise',
      description: 'Pourcentage de remise actuel',
      flex: 0.75,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.discountPercentage
              ? `${params.row.discountPercentage} %`
              : `-`}
          </>
        );
      },
    },
    {
      field: 'user.fullName',
      headerName: 'Création / Mise à jour',
      description: 'Responsable de la création ou de la mise à jour',
      flex: 1.5,
      filterable: false,
      sortable: false,
      type: 'text',
      editable: false,
      renderCell: (params) => {
        return <>{params.row.user.fullName}</>;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date de création',
      flex: 1.25,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.createdAt
              ? `${moment(params.row.createdAt).format('DD/MM/YYYY HH:MM:SS')}`
              : `-`}
          </>
        );
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Date de mise à jour',
      flex: 1.25,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.updatedAt
              ? `${moment(params.row.updatedAt).format('DD/MM/YYYY HH:MM:SS')}`
              : `-`}
          </>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      type: 'actions',
      flex: 2,
      editable: false,
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <BtnsActionsCrud
            key={params.row['@id']}
            params={params}
            rowId={rowId}
            setRefreshDataGrid={setRefreshDataGrid}
            setPage={setPage}
          />
        );
      },
    },
  ];

  return columns;
};

export default PromotionColumnsGenerator;
