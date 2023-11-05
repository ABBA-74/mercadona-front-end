import ArticleIcon from '@mui/icons-material/Article';
import { API_URL_IMG } from '../../../api/apiConfig';
import ProductActions from './ProductActions';
import Avatar from '@mui/material/Avatar';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 50, hideable: false, flex: 0.6 },
  {
    field: 'image.imgFile',
    headerName: 'Image',
    minWidth: 50,
    editable: false,
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      const imageUrl = `${API_URL_IMG}/${params.row.image?.imgFile}`;
      return (
        <Avatar src={imageUrl} variant='rounded'>
          <ArticleIcon />
        </Avatar>
      );
    },
  },
  { field: 'label', headerName: 'Label', editable: false, flex: 2 },
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
    field: 'discountedPrice',
    headerName: 'Prix soldé',
    description: 'Prix après remise',
    flex: 1,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          {params.row.discountedPrice ? `${params.row.discountedPrice} €` : `-`}
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
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      return (
        <>
          {params.row.isActive ? (
            <CheckRoundedIcon style={{ color: 'green', fontSize: '20px' }} />
          ) : (
            <CloseRoundedIcon style={{ color: '#C30808', fontSize: '20px' }} />
          )}
        </>
      );
    },
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
      return <ProductActions params={params} />;
    },
  },
];

export default columns;
