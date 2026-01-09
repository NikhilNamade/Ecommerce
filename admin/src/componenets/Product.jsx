import { FilePenLine, Trash2, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AllProducts, DeleteProduct } from "../api/admin.api";
import LoadingBar from "react-top-loading-bar";
import AddProduct from "./AddProductForm";
import Toast from "./Toast";
const  Product = ({ onSuccess, onError }) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await AllProducts();
      if (result.data.success) {
        setProducts(result.data.Products);
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [products]);
  const getDiscountPercent = (mrp, actual) => {
    return Math.round(((mrp - actual) / mrp) * 100);
  };
  return (
    <div className="h-[calc(100vh-64px)] bg-background p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col ">
        <h2 className="text-3xl font-bold mb-6 shrink-0">All Products</h2>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-muted-foreground/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pr-2">
            {products.map((product) => {
              const discount = getDiscountPercent(
                product.price.mrp,
                product.price.actualPrice
              );

              return (
                <div
                  key={product._id}
                  className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.productImage}
                      alt={product.name}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute top-3 right-3 flex flex-col gap-2
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200"
                    >
                      {discount > 0 && (
                        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold bg-green-700 text-white rounded">
                          {discount}% OFF
                        </span>
                      )}
                      <span
                        className="absolute top-15 right-3 px-1 py-1 text-xs font-bold bg-red-700 text-white rounded cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpen(true);
                        }}
                      >
                        <Trash2 size={16} color="#ffffff" strokeWidth={1.75} />
                      </span>
                      <span
                        className="absolute top-25 right-3 px-1 py-1 text-xs font-bold bg-white  text-white rounded cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setUpdate(true);
                        }}
                      >
                        <FilePenLine
                          size={16}
                          color="#000000"
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-card-foreground truncate flex-1">
                        {product.name}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
                        {product.category}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{product.price.actualPrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.price.mrp}
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Stock:{" "}
                        <span className="font-medium text-foreground">
                          {product.quantity}
                        </span>
                      </span>
                      <span
                        className={`font-medium ${
                          product.quantity > 0
                            ? "text-green-600"
                            : "text-destructive"
                        }`}
                      >
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card bg-white rounded-xl p-6 w-[320px] shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>

            <p className="text-sm text-muted-foreground mb-4">
              Do you want to delete product with ID:
              <span className="block mt-1 font-mono text-xs">
                {selectedProduct.name}
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded bg-muted"
              >
                No
              </button>

              <button
                onClick={async () => {
                  let result = await DeleteProduct(selectedProduct._id);
                  if (result.data.success) {
                    onSuccess();
                  } else {
                    onError();
                  }
                  setOpen(false);
                  console.log("Delete:", selectedProduct._id);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {update && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="absolute top-0 left-50 w-auto h-auto bg-white rounded-2xl p-4">
            <LoadingBar color="#f11946" progress={progress} shadow={true} />
            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
            <div className="flex justify-end items-center p-2">
              {" "}
              <button
                onClick={() => setUpdate(false)}
                className="cursor-pointer"
              >
                <XIcon color="#000000" strokeWidth={1.5} />
              </button>
            </div>
            <AddProduct
              event={selectedProduct}
              setProgress={setProgress}
              onSuccess={() => {
                setToast({
                  type: "success",
                  message: "Product added to inventory",
                });
                setTimeout(() => {
                  setUpdate(false);
                }, 3000);
              }}
              onError={() => {
                setToast({ type: "error", message: "Unable to add product" });
                setUpdate(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
