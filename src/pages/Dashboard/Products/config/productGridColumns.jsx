import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import { API_URL_IMG } from '../../../../api/apiConfig';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 50, hideable: false, flex: 0.6 },
  {
    field: 'image.imgFile',
    headerName: 'Image',
    minWidth: 50,
    editable: false,
    flex: 1,
    renderCell: (params) => {
      const imageUrl = `${API_URL_IMG}/${params.row.image?.imgFile}`;
      return (
        <Avatar src={imageUrl} variant='rounded'>
          <ArticleIcon />
        </Avatar>
      );
    },
  },
  { field: 'label', headerName: 'Label', editable: false, flex: 3 },
  {
    field: 'originalPrice',
    headerName: 'Prix',
    minWidth: 50,
    editable: false,
    flex: 1,
    renderCell: (params) => {
      return <>{params.row.originalPrice} €</>;
    },
  },
  {
    field: 'discountedPrice',
    headerName: 'Prix soldé',
    description: 'Prix après remise',
    flex: 1,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          {params.row.discountedPrice ? `${params.row.discountedPrice} %` : `-`}
        </>
      );
    },
  },
  {
    field: 'currentPromotionPercentage',
    headerName: 'Remise',
    description: 'Pourcentage de remise actuel',
    flex: 1,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          {params.row.currentPromotionPercentage
            ? `${params.row.currentPromotionPercentage} %`
            : `-`}
        </>
      );
    },
  },
  {
    field: 'isActive',
    headerName: 'Actif',
    description: 'Produit visible dans le catalogue',
    flex: 1,
    type: 'boolean',
    editable: false,
  },
  {
    field: 'action',
    headerName: 'Actions',
    flex: 2,
    editable: false,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <>
          <button className='btn btn-primary btn-edit'>
            <EditIcon className='icon-btn-actions' />
          </button>
          <button className='btn btn-danger btn-delete'>
            <DeleteIcon className='icon-btn-actions' />
          </button>
        </>
      );
    },
  },
];

export default columns;
