import { useEffect, useState } from "react";

const Modal = ({
  buttonText,
  title = "Modal Title",
  buttonClass = "btn btn-sm btn-default",
  modalClass = "",
  bodyClass = "",
  isOpen = false,
  children,
  onToggleClose,
  onToggleOpen,
}) => {
  const [open, setOpen] = useState(false);

  /**
   *
   * Update open state when isOpen prop updates
   *
   */
  useEffect(
    () => setOpen(() => isOpen),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  const onModalOpen = (e) => {
    setOpen(() => true);
    onToggleOpen && onToggleOpen();
  };

  const onModalClose = (e) => {
    setOpen(() => false);
    onToggleClose && onToggleClose();
  };

  return (
    <>
      {buttonText && (
        <button className={buttonClass} onClick={onModalOpen}>
          {buttonText}
        </button>
      )}

      {open && (
        <div className="fixed flex flex-col inset-0 z-50" tabIndex={-1}>
          <div
            className="fixed flex flex-col p-4 h-full w-full bg-white 
              bg-opacity-80 z-10"
            onClick={onModalClose}
          ></div>

          <div className={`block max-w-2xl w-full m-auto px-4 ${modalClass}`}>
            <div className={`flex flex-col relative overflow-hidden z-20 `}>
              <div
                className="flex justify-between px-4 py-3 items-center 
                relative bg-blue-200"
              >
                <h4 className="flex m-0 font-bold">{title}</h4>
                <span
                  title="Close"
                  className="flex px-4 py-2 absolute text-lg right-0"
                  onClick={onModalClose}
                >
                  &times;
                </span>
              </div>

              <div
                className={`flex flex-col w-full min-h-[16em] max-h-[80vh] p-4 bg-white 
                  overflow-auto ${bodyClass}`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
