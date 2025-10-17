"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";

export default function AddDishPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [popular, setPopular] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const catList = snapshot.docs.map(doc => doc.data().name);
      setCategories(catList);
      if (catList.length > 0) setCategory(catList[0]);
    };
    fetchCategories();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please select an image");
    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(image);
      await addDoc(collection(db, "dishes"), {
        name: dishName,
        category,
        price,
        desc,
        prepTime,
        popular,
        imageUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      toast.success("Dish added successfully!");
      // Redirect to the previous page
     router.push("/admin/dashboard?tab=menu");
    } catch (err) {
      console.error(err);
      toast.error("Error adding dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">Add New Dish</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />

        {/* Category dropdown with Add Category option */}
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
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Prep Time"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="border px-4 py-2 rounded-md"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={popular}
            onChange={() => setPopular(!popular)}
          />
          Popular
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          {loading ? "Uploading..." : "Add Dish"}
        </button>
      </form>
    </div>
  );
}
