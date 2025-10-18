"use client";

import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileImage, X, Sparkles, User, Type, FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!title || !content || !author) return toast.error("Please fill all required fields");
    if (!image) return toast.error("Please select an image");

    setLoading(true);

    toast.promise(
      (async () => {
        // Upload image to Cloudinary
        let imageUrl = "";
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "blogs/images");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        imageUrl = data.secure_url;

        // Add blog to Firestore
        await addDoc(collection(db, "blogs"), {
          title,
          author,
          content,
          image: imageUrl,
          slug: generateSlug(title),
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      })(),
      {
        loading: "Publishing blog...",
        success: "Blog created successfully!",
        error: "Failed to create blog",
      }
    )
      .then(() => router.push("/admin/dashboard?tab=posts"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Create Something Amazing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            New Blog Post
          </h1>
          <p className="text-gray-600 text-lg">Share your thoughts with the world</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Type className="w-4 h-4 text-orange-500" />
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter an engaging title..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 text-orange-500" />
                Author Name
              </label>
              <input
                type="text"
                placeholder="Who's writing this?"
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-orange-500" />
                Content
              </label>
              <textarea
                placeholder="Start writing your story..."
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg h-64 resize-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all duration-200"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-2">{content.length} characters</p>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileImage className="w-4 h-4 text-orange-500" />
                Featured Image
              </label>

              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-200 group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-16 h-16 mb-4 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <FileImage className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="mb-2 text-sm text-gray-700 font-semibold">
                      <span className="text-orange-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              ) : (
                <div className="relative w-full h-80 rounded-xl overflow-hidden border-2 border-gray-200 group">
                  <Image src={preview} alt="Preview" fill style={{ objectFit: "cover" }} sizes="100vw" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Publish Blog Post
                </span>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Your blog post will be visible immediately after publishing
        </p>
      </div>
    </div>
  );
}

// 👇 Prevent Next.js from prerendering this page
export const dynamic = "force-dynamic";
