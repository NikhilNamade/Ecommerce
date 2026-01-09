import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // slide in

    const hideTimer = setTimeout(() => {
      setShow(false); // slide out
    }, 2500);

    const closeTimer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed top-20 right-5 z-50 overflow-hidden">
      <div
        className={`
          px-4 py-3 rounded-lg shadow-lg text-white text-sm
          transform transition-all duration-500 ease-in-out
          ${show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
