import { useEffect, useState } from "react";

import Loader from "./Loader";

const StatusMessage = ({ status = {} }) => {
  const [objState, setObjState] = useState({});

  /**
   *
   * Init object state
   *
   */
  useEffect(() => {
    if (Object.keys(status)?.length > 0) {
      setObjState(status);
    }
  }, [status]);

  const resetMessage = () => {
    setObjState((prevState) => {
      return {
        ...prevState,
        message: "",
      };
    });
  };

  const {
    message = "",
    error = false,
    loading = false,
    loadingText = "Loading...",
    saving = false,
    savingText = "Saving...",
  } = objState;

  const alertClass = error ? "danger" : "success";

  return (
    <>
      {!loading && !saving && message && (
        <div className={`alert alert-${alertClass}`}>
          <span
            className="flex flex-col flex-1"
            dangerouslySetInnerHTML={{ __html: message }}
          ></span>
          <span
            className="close ml-4"
            data-dismiss="alert"
            aria-label="close"
            onClick={() => resetMessage()}
          >
            &times;
          </span>
        </div>
      )}

      {loading && <Loader text={loadingText} />}

      {saving && <Loader text={savingText} />}
    </>
  );
};

export default StatusMessage;
