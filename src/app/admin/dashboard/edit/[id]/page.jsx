"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function EditDishPage() {
  const router = useRouter();
  const { id } = useParams();

  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [popular, setPopular] = useState(false);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [orderLink, setOrderLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  // Fetch existing dish
  useEffect(() => {
    const fetchDish = async () => {
      const docRef = doc(db, "dishes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDishName(data.name);
        setCategory(data.category);
        setPrice(data.price?.replace("$", "") || "");
        setDesc(data.desc);
        setPopular(data.popular || false);
        setExistingImage(data.imageUrl);
        setOrderLink(data.orderLink || "");
      }
    };
    fetchDish();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const catList = snapshot.docs.map(doc => doc.data().name);
      setCategories(catList);
      if (!category && catList.length > 0) setCategory(catList[0]);
    };
    fetchCategories();
  }, [category]);

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

  // Validation helpers
  const isValidName = (name) => /^[a-zA-Z\s]+$/.test(name.trim());
  const isValidPrice = (p) => !isNaN(p) && Number(p) > 0;
  const isValidURL = (url) => {
    if (!url) return true; // optional
    try { new URL(url); return true; } catch { return false; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!isValidName(dishName)) return toast.error("Dish name must only contain letters");
    if (!category) return toast.error("Please select a category");
    if (!isValidPrice(price)) return toast.error("Price must be a valid number");
    if (!isValidURL(orderLink)) return toast.error("Order link must be a valid URL");
    if (!desc.trim()) return toast.error("Description cannot be empty");

    setLoading(true);
    try {
      let imageUrl = existingImage;
      if (image) imageUrl = await uploadToCloudinary(image);

      await updateDoc(doc(db, "dishes", id), {
        name: dishName,
        category,
        price: `$${Number(price).toFixed(2)}`,
        desc,
        popular,
        imageUrl,
        orderLink,
        updatedAt: Timestamp.now(),
      });

      toast.success("Dish updated successfully!");
      router.push("/admin/dashboard?tab=menu");
    } catch (err) {
      console.error(err);
      toast.error("Error updating dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">Edit Dish</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        />

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
          <option value="">-- Select Category --</option>
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
          required
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

        <div>
          <p className="text-gray-600 mb-1">Dish Image:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {existingImage && !image && (
            <img
              src={existingImage}
              alt="Existing Dish"
              className="mt-2 w-40 h-40 object-cover rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          {loading ? "Updating..." : "Update Dish"}
        </button>
      </form>
    </div>
  );
}
