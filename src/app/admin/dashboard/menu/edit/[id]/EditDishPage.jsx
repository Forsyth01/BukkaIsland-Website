"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function EditDishPage() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const catList = snapshot.docs.map((doc) => doc.data().name);
      setCategories(catList);
    };
    fetchCategories();
  }, []);

  // Fetch dish data by ID
  useEffect(() => {
    const fetchDish = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "dishes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDishName(data.name);
          setCategory(data.category);
          setPrice(data.price);
          setDesc(data.desc);
          setPopular(data.popular || false);
          setOrderLink(data.orderLink || "");
          setPreview(data.imageUrl);
        } else {
          toast.error("Dish not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching dish data");
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id]);

  // Upload image to Cloudinary
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!dishName.trim()) return toast.error("Dish name is required");
    if (!category.trim()) return toast.error("Category is required");
    if (!price || isNaN(price)) return toast.error("Price must be a number");
    if (orderLink && !isValidUrl(orderLink))
      return toast.error("Order link must be valid");

    setUpdating(true);

    try {
      let imageUrl = preview;
      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      const dishRef = doc(db, "dishes", id);
      await updateDoc(dishRef, {
        name: dishName,
        category,
        price,
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
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading dish data...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">Edit Dish</h2>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
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
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-md"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

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
          disabled={updating}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
        >
          {updating ? "Updating..." : "Update Dish"}
        </button>
      </form>
    </div>
  );
}
