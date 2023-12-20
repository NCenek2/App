import React from "react";

const ErrorAlert = ({ errorMessage, setShowErrorMessage }) => {
  return (
    <div
      className="alert alert-danger text-center alert-dismissible fade show error-alert"
      role="alert"
    >
      {errorMessage}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => setShowErrorMessage(false)}
      ></button>
    </div>
  );
};

export default ErrorAlert;
