import moment from 'moment/moment';
import { API_URL_IMG } from '../../../api/apiConfig';
import Avatar from '@mui/material/Avatar';
import CategoryActions from './CategoryActions';
import CategoryIcon from '@mui/icons-material/Category';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 50,
    hideable: false,
    flex: 0.6,
  },
  {
    field: 'image.imgFile',
    headerName: 'Image',
    minWidth: 50,
    editable: false,
    flex: 0.75,
    sortable: false,
    renderCell: (params) => {
      const imageUrl = `${API_URL_IMG}/${params.row.image?.imgFile}`;
      return (
        <Avatar src={imageUrl} variant='rounded'>
          <CategoryIcon />
        </Avatar>
      );
    },
  },
  { field: 'label', headerName: 'Label', editable: false, flex: 2 },
  {
    field: 'user.fullName',
    headerName: 'Création / Mise à jour',
    description: 'Responsable de la création ou de la mise à jour',
    flex: 2,
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
    flex: 1.5,
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
    flex: 1.5,
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
      return <CategoryActions params={params} />;
    },
  },
];

export default columns;
