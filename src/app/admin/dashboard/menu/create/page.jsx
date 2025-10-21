"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FileImage, X, Sparkles, ArrowLeft } from "lucide-react";

// Memoized Image Preview
const ImagePreview = memo(({ preview, onRemove }) => (
  <div className="relative w-full h-64 rounded-xl overflow-hidden border border-zinc-800 group">
    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-4 right-4 p-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
      aria-label="Remove image"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
));

ImagePreview.displayName = "ImagePreview";

export default function CreateDishPage() {
  const router = useRouter();

  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState(""); // keep empty by default
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [popular, setPopular] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [orderLink, setOrderLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const catList = snapshot.docs.map((doc) => doc.data().name);
      setCategories(catList);
      // removed the line that automatically sets first category
    };
    fetchCategories();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addDoc(collection(db, "categories"), { name: newCategory });
      setCategories((prev) => [...prev, newCategory]);
      setCategory(newCategory);
      setNewCategory("");
      setShowNewCategoryInput(false);
      toast.success("Category added!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding category");
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const removeImage = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dishName.trim()) return toast.error("Dish name is required");
    if (!category.trim()) return toast.error("Category is required");
    if (!price || isNaN(price)) return toast.error("Price must be a number");
    if (orderLink && !isValidUrl(orderLink))
      return toast.error("Order link must be a valid URL");
    if (!image) return toast.error("Please select an image");

    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(image);

      await addDoc(collection(db, "dishes"), {
        name: dishName,
        category,
        price,
        desc,
        popular,
        imageUrl,
        orderLink,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      toast.success("Dish created successfully!");
      router.push("/admin/dashboard?tab=menu");
    } catch (err) {
      console.error(err);
      toast.error("Error creating dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 font-medium mb-4 w-fit backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Create New Dish</span>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
          <form className="p-6 md:p-10 space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Dish Name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
              required
            />

            {/* Category dropdown */}
            <div className="flex flex-col gap-2">
              <select
                value={category}
                onChange={(e) => {
                  if (e.target.value === "__add_new__") {
                    setShowNewCategoryInput(true);
                    setCategory("");
                  } else {
                    setCategory(e.target.value);
                    setShowNewCategoryInput(false);
                  }
                }}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
                required={!showNewCategoryInput}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__add_new__">+ Add New Category</option>
              </select>

              {showNewCategoryInput && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Price in $"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
              required
            />

            <textarea
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200 resize-none"
            />

            <input
              type="text"
              placeholder="Order Link (e.g. DoorDash URL)"
              value={orderLink}
              onChange={(e) => setOrderLink(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
            />

            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={popular}
                onChange={() => setPopular(!popular)}
              />
              Popular
            </label>

            {/* Image Upload */}
            <div className="space-y-2">
              <p className="text-sm text-zinc-300">Dish Image:</p>
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-800 rounded-xl cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-200 group">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="w-16 h-16 mb-4 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <FileImage className="w-8 h-8 text-amber-500" />
                    </div>
                    <p className="text-sm text-zinc-300 font-semibold">
                      <span className="text-amber-500">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <ImagePreview preview={preview} onRemove={removeImage} />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {loading ? "Creating..." : "Create Dish"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
