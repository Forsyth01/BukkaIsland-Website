"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/lib/firebaseClient";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import axios from "axios";
import { ImageIcon } from "lucide-react"; // Icon for image upload
import toast, { Toaster } from "react-hot-toast";

export default function EditBlog() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setAuthor(data.author);
          setContent(data.content);
          setCurrentImage(data.image || "");
          setPreview(data.image || "");
        } else {
          toast.error("Blog not found");
          router.push("/admin/dashboard");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error("Failed to fetch blog data");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, router]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Update blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    toast.promise(
      (async () => {
        let imageUrl = currentImage;

        if (image) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", uploadPreset);
          formData.append("folder", "blogs/images");

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );
          imageUrl = res.data.secure_url;
        }

        const docRef = doc(db, "blogs", id);
        await updateDoc(docRef, {
          title,
          author,
          content,
          image: imageUrl,
          updatedAt: Timestamp.now(),
        });
      })(),
      {
        loading: "Updating blog...",
        success: "Blog updated successfully!",
        error: "Failed to update blog",
      }
    )
      .then(() => router.push("/admin/dashboard?tab=posts"))
      .finally(() => setSaving(false));  
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-orange-50 py-10 px-5">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          <h1 className="text-2xl font-bold text-orange-700 mb-6">Edit Blog</h1>

          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Image Preview
                </p>
                <img
                  src={preview}
                  alt="Blog Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Replace Image
              </label>
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="flex flex-col items-center text-gray-400">
                  <ImageIcon size={32} />
                  <span className="mt-1">Click to choose image</span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 text-white px-6 py-2 rounded-full"
            >
              {saving ? "Saving..." : "Update Blog"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
