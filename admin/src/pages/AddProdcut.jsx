import React, {useState } from "react";
import AddProduct from "../componenets/AddProductForm";
import LoadingBar from "react-top-loading-bar";
import Toast from "../componenets/Toast";
const AddProdcut = () => {
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);
  return (
    <>
      <LoadingBar color="#f11946" progress={progress} shadow={true} />
     {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AddProduct
        setProgress={setProgress}
        onSuccess={() =>
          setToast({ type: "success", message: "Product added to inventory" })
        }
        onError={() =>
          setToast({ type: "error", message: "Unable to add product" })
        }
      />
    </>
  );
};

export default AddProdcut;
