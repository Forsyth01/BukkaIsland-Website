"use client";

import { useState, useEffect } from "react";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function CreateDishPage() {
  const router = useRouter();

  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState("");
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
      if (catList.length > 0 && !category) setCategory(catList[0]);
    };
    fetchCategories();
  }, [category]);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
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
    <div className="max-w-3xl mx-auto mt-10 p-6  shadow-md rounded-xl">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">Create New Dish</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />

        {/* Category dropdown */}
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
          className="border px-4 py-2 rounded-md"
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
              className="border px-4 py-2 rounded-md flex-1"
              required
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add
            </button>
          </div>
        )}

        <input
          type="text"
          placeholder="Price in $"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="border px-4 py-2 rounded-md"
        />

        <input
          type="text"
          placeholder="Order Link (e.g. DoorDash URL)"
          value={orderLink}
          onChange={(e) => setOrderLink(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={popular}
            onChange={() => setPopular(!popular)}
          />
          Popular
        </label>

        {/* Image Upload */}
        <div>
          <p className="text-gray-600 mb-1">Dish Image:</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-40 h-40 object-cover rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          {loading ? "Creating..." : "Create Dish"}
        </button>
      </form>
    </div>
  );
}
