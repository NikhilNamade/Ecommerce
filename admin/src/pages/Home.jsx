import React, { useState } from "react";
import Product from "../componenets/Product";
import Toast from "../componenets/Toast";

const Home = () => {
  const [toast, setToast] = useState(null);
  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Product
        onSuccess={() =>
          setToast({
            type: "success",
            message: "Product Delete from inventory",
          })
        }
        onError={() =>
          setToast({ type: "error", message: "Unable to delete product" })
        }
      />
    </>
  );
};

export default Home;
