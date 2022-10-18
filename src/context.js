import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [favorite, setFavorite] = useState(false);

 const openModal = () => {
   setIsModalOpen(true);
 };
 
 const closeModal = () => {
   setIsModalOpen(false);
 };

 const toggleFavorite = () => {
   setFavorite(!favorite);
 };

return (
  <AppContext.Provider
    value={{
      isModalOpen,
      openModal,
      closeModal,
      favorite,
      setFavorite,
      toggleFavorite,
    }}
  >
    {children}
  </AppContext.Provider>
);

}
   
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
