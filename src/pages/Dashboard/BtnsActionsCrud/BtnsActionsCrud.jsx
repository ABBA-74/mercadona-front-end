import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import './BtnsActionsCrud.scss';

const BtnsActionsCrud = ({ params }) => {
  const handleEdit = () => {
    console.log('Edit');
    console.log(params.row['@id']);
  };
  const handleDelete = () => {
    console.log('Delete');
    console.log(params.row['@id']);
  };
  return (
    <>
      <Tooltip title='Editer'>
        <button
          className='btn btn-primary btn-actions-crud btn-edit'
          onClick={handleEdit}
        >
          <EditIcon className='icon-btn-actions' />
        </button>
      </Tooltip>
      <Tooltip title='Supprimer'>
        <button
          className='btn btn-danger btn-actions-crud btn-delete'
          onClick={handleDelete}
        >
          <DeleteIcon className='icon-btn-actions' />
        </button>
      </Tooltip>
    </>
  );
};

BtnsActionsCrud.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.shape({
      '@id': PropTypes.string.isRequired,
      // others
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default BtnsActionsCrud;
