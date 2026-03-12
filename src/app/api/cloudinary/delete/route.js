import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with server-side credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extract public_id from Cloudinary URL
function extractPublicId(url) {
  if (!url) return null;

  try {
    // Handle URLs like: https://res.cloudinary.com/cloud_name/image/upload/v123456/folder/filename.jpg
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1]; // Returns "folder/filename" or just "filename"
    }

    // Alternative: try to get everything after /upload/
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const afterUpload = url.slice(uploadIndex + 8);
      // Remove version number if present (v123456/)
      const withoutVersion = afterUpload.replace(/^v\d+\//, "");
      // Remove file extension
      const withoutExt = withoutVersion.replace(/\.\w+$/, "");
      return withoutExt;
    }

    return null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { publicId, imageUrl } = body;

    // Use provided publicId or extract from URL
    let idToDelete = publicId;

    if (!idToDelete && imageUrl) {
      idToDelete = extractPublicId(imageUrl);
    }

    if (!idToDelete) {
      return NextResponse.json(
        { error: "No public_id or valid imageUrl provided" },
        { status: 400 }
      );
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(idToDelete);

    if (result.result === "ok" || result.result === "not found") {
      return NextResponse.json({
        success: true,
        message: result.result === "ok" ? "Image deleted successfully" : "Image not found (may have been deleted already)",
        result,
      });
    }

    return NextResponse.json(
      { error: "Failed to delete image", result },
      { status: 500 }
    );
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
