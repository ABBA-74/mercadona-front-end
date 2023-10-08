const ErrorMessage = () => {
  return (
    <div className='alert-msg d-flex justify-content-center'>
      <p className='alert alert-warning w-75'>
        Nous avons rencontré un problème de chargement des données. Nous
        travaillons à résoudre ce problème rapidement.
        <br />
        Nous nous excusons pour tout désagrément que cela pourrait causer. Nous
        faisons tout notre possible pour résoudre ce problème rapidement. Nous
        vous remercions de votre compréhension et de votre patience.
      </p>
    </div>
  );
};

export default ErrorMessage;
