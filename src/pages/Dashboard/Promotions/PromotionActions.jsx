import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const PromotionActions = ({ params }) => {
  return (
    <>
      <Tooltip title='Editer'>
        <button className='btn btn-primary btn-edit'>
          <EditIcon className='icon-btn-actions' />
        </button>
      </Tooltip>
      <Tooltip title='Supprimer'>
        <button className='btn btn-danger btn-delete'>
          <DeleteIcon className='icon-btn-actions' />
        </button>
      </Tooltip>
    </>
  );
};

export default PromotionActions;
