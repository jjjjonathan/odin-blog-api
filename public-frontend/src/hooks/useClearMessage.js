import { useEffect } from 'react';

const useClearMessage = (setSuccess, setError) => {
  useEffect(() => {
    setSuccess('');
    setError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useClearMessage;
