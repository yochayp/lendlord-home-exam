import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggleUserModal() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggleUserModal,
  }
};

export default useModal;