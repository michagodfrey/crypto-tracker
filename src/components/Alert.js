import React, { useEffect } from 'react'

const Alert = ({ type, msg, showAlert }) => {
    useEffect(() => {
      const timeout = setTimeout(() => {
        showAlert();
      }, 3000);
      return () => clearTimeout(timeout);
    }, [showAlert]);
  return <span className={`alert alert--${type}`}>{msg}</span>
}

export default Alert