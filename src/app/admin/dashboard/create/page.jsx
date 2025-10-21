"use client";

import { useState, memo, useCallback } from "react";
import { FileImage, X, Sparkles, User, Type, FileText, ArrowLeft } from "lucide-react";

// Memoized Image Preview Component
const ImagePreview = memo(({ preview, onRemove }) => (
  <div className="relative w-full h-80 rounded-xl overflow-hidden border border-zinc-800 group">
    <img 
      src={preview} 
      alt="Preview" 
      className="w-full h-full object-cover"
    />
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

ImagePreview.displayName = 'ImagePreview';

// Memoized Input Field Component
const InputField = memo(({ icon: Icon, label, type = "text", placeholder, value, onChange, required = false, rows }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
      <Icon className="w-4 h-4 text-amber-500" />
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {rows ? (
      <div className="relative">
        <textarea
          placeholder={placeholder}
          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200 resize-none"
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
        />
        <div className="absolute bottom-3 right-3 text-xs text-zinc-600">
          {value.length} characters
        </div>
      </div>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
));

InputField.displayName = 'InputField';

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "demo";

  const generateSlug = useCallback((text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  , []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const removeImage = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImage(null);
    setPreview(null);
  }, [preview]);

  const showToast = (message, type = "success") => {
    // Simple toast implementation
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!title || !content || !author) {
      showToast("Please fill all required fields", "error");
      return;
    }
    if (!image) {
      showToast("Please select an image", "error");
      return;
    }

    setLoading(true);
    setUploadProgress(10);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "blogs/images");

      setUploadProgress(30);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      
      if (!res.ok) throw new Error("Image upload failed");
      
      const data = await res.json();
      const imageUrl = data.secure_url;
      
      setUploadProgress(60);

      // Add blog to Firestore
      const { addDoc, collection, Timestamp } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebaseClient");
      
      await addDoc(collection(db, "blogs"), {
        title,
        author,
        content,
        image: imageUrl,
        slug: generateSlug(title),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      setUploadProgress(100);
      showToast("Blog created successfully!");
      
      // Navigate after short delay
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/admin/dashboard?tab=posts";
        }
      }, 1000);
      
    } catch (error) {
      console.error("Error:", error);
      showToast("Failed to create blog", "error");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 font-medium mb-4 w-fit backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Create Something Amazing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              New Blog Post
            </h1>
            <p className="text-zinc-400 text-lg">Share your culinary stories with the world</p>
          </div>

          {/* Form */}
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-6 md:p-10 space-y-6">
              <InputField
                icon={Type}
                label="Blog Title"
                placeholder="Enter an engaging title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <InputField
                icon={User}
                label="Author Name"
                placeholder="Who's writing this?"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />

              <InputField
                icon={FileText}
                label="Content"
                placeholder="Start writing your story..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
              />

              {/* Image Upload */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <FileImage className="w-4 h-4 text-amber-500" />
                  Featured Image
                  <span className="text-red-500">*</span>
                </label>

                {!preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-800 rounded-xl cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-200 group">
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="w-16 h-16 mb-4 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <FileImage className="w-8 h-8 text-amber-500" />
                      </div>
                      <p className="mb-2 text-sm text-zinc-300 font-semibold">
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

              {/* Progress Bar */}
              {loading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

          <p className="text-center text-sm text-zinc-500 mt-6">
            Your blog post will be visible immediately after publishing
          </p>
        </div>
      </div>
    </div>
  );
}