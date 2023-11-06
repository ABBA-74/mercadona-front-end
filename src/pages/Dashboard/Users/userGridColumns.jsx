import moment from 'moment/moment';
import UserActions from './UserActions';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 50,
    hideable: false,
    flex: 0.6,
  },
  {
    field: 'fullName',
    headerName: 'Nom complet',
    flex: 1,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1.75,
    editable: false,
  },
  {
    field: 'roles',
    headerName: 'Role',
    flex: 1,
    editable: false,
    type: 'singleSelect',
    renderCell: (params) => {
      let userRole = '';
      let roles = params.row.roles.join(' ', ',');
      if (roles.includes('ROLE_SUPER_ADMIN')) userRole = 'Manager';
      else if (roles.includes('ROLE_ADMIN')) userRole = 'Commercial';
      else if (roles.includes('ROLE_USER')) userRole = 'Client';
      else userRole = '-';

      return <>{userRole}</>;
    },
  },
  {
    field: 'createdAt',
    headerName: 'Date de création',
    flex: 1,
    editable: true,
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
    flex: 1,
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
      return <UserActions params={params} />;
    },
  },
];

export default columns;
