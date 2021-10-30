import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [list]);
  return (
    <div className="text-center">
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};
export default Alert;
