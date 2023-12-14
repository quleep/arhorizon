import React, { useEffect, useState } from 'react'


const Alert = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [onClose]);
  return (
    <div>
    <div className={`alert ${type} ${isVisible ? 'show' : 'hide'}`}>
    <div className= {type === 'error' ? "barerror": 'bar' }></div>
 <p className= {type === 'error' ? "alerttexterror": 'alerttextsuccess' }>{  message}</p> 
</div>
</div>
  )
}

export default Alert
