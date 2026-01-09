import { useState } from "react";
import { saveProduct, updateEvent } from "../api/admin.api";

const AddProduct = ({ setProgress, onSuccess, onError, event }) => {
  const [formData, setFormData] = useState(() => ({
    name: event?.name || "",
    category: event?.category || "",
    subcategory: event?.subcategory || "",
    quantity: event?.quantity || "",
    mrp: event?.price?.mrp || "",
    actualPrice: event?.price?.actualPrice || "",
    sizes: event?.sizes || [],
  }));

  const [imagePreview, setImagePreview] = useState(event?.productImage || null);
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const categories = {
    Men: ["Shirts", "Pants", "Jackets", "Shoes", "Accessories"],
    Women: ["Tops", "Dresses", "Jeans", "Skirts", "Heels", "Handbags"],
    Kid: ["T-Shirts", "Shorts", "Frocks", "School Shoes", "Toys"],
  };
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData.category);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processImage(file);
  };

  const processImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processImage(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hiii");
    try {
      setProgress(25);
      const formdata = new FormData();
      formdata.append("name", formData.name);
      formdata.append("category", formData.category);
      formdata.append("subcategory", formData.subcategory);
      formdata.append("sizes", JSON.stringify(formData.sizes));
      formdata.append("quantity", formData.quantity);
      formdata.append("mrp", formData.mrp);
      formdata.append("actualPrice", formData.actualPrice);
      formdata.append("productImage", imageFile || imagePreview);
      setProgress(70);
      console.log("hiii");
      let result = await (event
        ? updateEvent(formdata, event._id)
        : saveProduct(formdata));
      // let result = await saveProduct(formdata);
      console.log(result);
      if (result?.success || result?.data?.success) {
        setProgress(100);
        onSuccess();
      } else {
        setProgress(100);
        onError();
      }
    } catch (error) {
      console.error(error);
      setProgress(100);
      onError(error?.message || "Network error");
    }
  };

  // run once
  const discount =
    formData.mrp && formData.actualPrice
      ? Math.round(((formData.mrp - formData.actualPrice) / formData.mrp) * 100)
      : 0;
  return (
    <div className="max-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Add New Product
          </h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details below to add a new product to your inventory
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-6 gap-8"
        >
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6 pb-4 border-b border-border">
              Product Information
            </h2>

            {/* Product Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Premium Cotton T-Shirt"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="text-muted-foreground">
                    Select category
                  </option>
                  {/* {categories.for((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))} */}
                  {Object.entries(categories).map(([cat]) => {
                    return (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Category & Quantity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sub-Categories <span className="text-destructive">*</span>
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  required={!!formData.category}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="text-muted-foreground">
                    Sub-Categories
                  </option>
                  {formData.category &&
                    categories[formData.category].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stock Quantity <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>
            {/*Quantity Row and size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Available Sizes <span className="text-destructive">*</span>
                </label>

                <div className="flex  gap-3">
                  {sizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer
                     hover:bg-muted/40"
                    >
                      <input
                        type="checkbox"
                        checked={formData.sizes.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Pricing Section */}
            <div className="mt-8 mb-5">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                {/* <span className="w-8 h-[2px] bg-primary rounded"></span> */}
                Pricing Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    MRP (₹) <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="mrp"
                      value={formData.mrp}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Selling Price (₹){" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="actualPrice"
                      value={formData.actualPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button - Mobile */}
            <button
              type="submit"
              className="lg:hidden w-full mt-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
            >
              Add Product
            </button>
          </div>

          {/* Right Column - Image Upload */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground mb-6 pb-4 border-b border-border mb-4">
                Product Image
              </h2>

              {/* Image Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl transition-all overflow-hidden
                  ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : imagePreview
                      ? "border-transparent"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }
                `}
              >
                {imagePreview ? (
                  <div className="relative aspect-square">
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <label className="flex-1 cursor-pointer py-2 px-4 bg-white/90 text-foreground text-sm font-medium rounded-lg text-center hover:bg-white transition-colors">
                          Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="py-2 px-4 cursor-pointer  bg-white/90 text-destructive-foreground text-sm font-medium rounded-lg hover:bg-destructive transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {/* Image info badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-md">
                      {imageFile?.name?.slice(0, 15)}
                      {imageFile?.name?.length > 15 ? "..." : ""}
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block aspect-square">
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drop your image here
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        or click to browse
                      </p>
                      <span className="text-xs text-muted-foreground/70">
                        PNG, JPG up to 5MB
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Image Requirements */}
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></span>
                  Recommended: 800x800px or higher
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"></span>
                  Square images work best
                </p>
              </div>
            </div>

            {/* Submit Button - Desktop */}
            <button
              type="submit"
              className="hidden lg:block w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25 border border-border rounded-2xl cursor-pointer"
            >
              {event
                ? "Update Product to Inventory"
                : "Add Product to Inventory"}
            </button>
          </div>
          <div>
            {/* Quick Stats Preview */}
            {(formData.name || formData.category) && (
              <div className="bg-muted/50 border h-auto border-border rounded-xl p-4">
                <p className="text-xs font-medium text-foreground pb-3 border-b border-border uppercase tracking-wider">
                  Preview
                </p>
                <p className="font-semibold text-foreground truncate">
                  {formData.name || "Product Name"}
                </p>
                {formData.category && (
                  <span className="inline-block mt-2  py-0.5 text-xs bg-primary/10 text-primary rounded-full capitalize">
                    {formData.category} :- {formData.subcategory}
                  </span>
                )}
                {formData.sizes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.sizes.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {formData.actualPrice && (
                  <p className="mt-2 text-lg font-bold text-primary">
                    ₹{formData.actualPrice}
                  </p>
                )}
              </div>
            )}
            {/* Discount Preview */}
            {discount > 0 && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  💰 Customer saves {discount}% (₹
                  {formData.mrp - formData.actualPrice})
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
