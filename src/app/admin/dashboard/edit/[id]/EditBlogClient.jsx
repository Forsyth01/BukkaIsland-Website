"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/lib/firebaseClient";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import axios from "axios";
import {
  FileImage,
  X,
  Sparkles,
  User,
  Type,
  FileText,
  ArrowLeft,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Memoized Image Preview
const ImagePreview = memo(({ preview, onRemove }) => (
  <div className="relative w-full h-80 rounded-xl overflow-hidden border border-zinc-800 group">
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

// Memoized Input Field
const InputField = memo(
  ({
    icon: Icon,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    rows,
  }) => (
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
  )
);

InputField.displayName = "InputField";

export default function EditBlogClient() {
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
  const [uploadProgress, setUploadProgress] = useState(0);

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
    if (id) fetchBlog();
  }, [id, router]);

  // Image handling
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const removeImage = useCallback(() => {
    if (preview && preview !== currentImage) {
      URL.revokeObjectURL(preview);
    }
    setImage(null);
    setPreview(null); // allow selecting a new image
  }, [preview, currentImage]);

  // Update blog
  const handleUpdate = async () => {
    if (!title || !author || !content) {
      toast.error("Please fill all required fields");
      return;
    }
    setSaving(true);
    setUploadProgress(10);

    try {
      let imageUrl = currentImage;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "blogs/images");

        setUploadProgress(30);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(30 + percent * 0.7); // smooth
            },
          }
        );
        imageUrl = res.data.secure_url;
      }

      setUploadProgress(80);

      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        title,
        author,
        content,
        image: imageUrl,
        updatedAt: Timestamp.now(),
      });

      setUploadProgress(100);
      toast.success("Blog updated successfully!");

      setTimeout(() => router.push("/admin/dashboard?tab=posts"), 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog");
      setUploadProgress(0);
    } finally {
      setSaving(false);
    }
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
      <div className="min-h-screen bg-zinc-950 relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
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
            <span>Edit Your Blog</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Edit Blog Post
          </h1>
          <p className="text-zinc-400 text-lg mb-6">
            Update your culinary story
          </p>

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
              {saving && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
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
                onClick={handleUpdate}
                disabled={saving}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Update Blog
                  </span>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Your blog post will be updated immediately after saving
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
