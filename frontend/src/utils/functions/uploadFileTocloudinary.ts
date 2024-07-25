"use client";

export default async function uploadFileToCloudinary(
  file: File
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const cloudinaryUploadUrl =
      "https://api.cloudinary.com/v1_1/ddoku9wa1/image/upload";

    const cloudinaryResponse = await fetch(cloudinaryUploadUrl, {
      method: "POST",
      body: formData,
    });

    const cloudinaryData = await cloudinaryResponse.json();
    const imageUrl = cloudinaryData.secure_url;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}
