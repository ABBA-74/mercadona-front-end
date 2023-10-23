import { useMemo } from 'react';
import {
  noProductsByCategoryMessage,
  noProductsBySearchMessage,
} from '../../../data/errorMessages';

import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const NoProductsFoundAlert = () => {
  const { title, message } = useMemo(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    const randomIndex = Math.floor(
      Math.random() * noProductsBySearchMessage.length
    );
    const selectedMessage = savedQuery
      ? noProductsBySearchMessage[randomIndex]
      : noProductsByCategoryMessage;
    const formattedMessage = selectedMessage.message.replace(
      '[query]',
      savedQuery
    );
    return {
      title: selectedMessage.title,
      message: formattedMessage,
    };
  }, []);

  return <ErrorMessage title={title} message={message} />;
};

export default NoProductsFoundAlert;
