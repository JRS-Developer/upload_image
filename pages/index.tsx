import Image from "next/image";
import type { NextPage } from "next";
import { useState } from "react";

interface UploadImgResponse {
  url: string;
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    if (!isImage(file)) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { url }: UploadImgResponse = await response.json();

    setImage(url);
    setLoading(false);
  };

  const isImage = (file: File) => {
    return file.type.startsWith("image/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    file && uploadImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    file && uploadImage(file);
  };

  const handleCopyClick = () => image && navigator.clipboard.writeText(image);

  if (loading)
    return (
      <div>
        <p>Uploading...</p>
        <div></div>
      </div>
    );

  if (image) {
    return (
      <div>
        <h3>Uploaded Successfully!</h3>
        <Image src={image} height={500} width={500} alt="Uploaded image" />
        <div>
          <p>{image}</p>
          <button onClick={handleCopyClick}>Copy Link</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <form>
        <div>
          <h1>Upload your image</h1>
          <p>File should be Jpeg, Png...</p>
        </div>
        <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          <Image src="/upload.svg" alt="" width={115} height={90} />
          <p>Drag & Drop your image here</p>
        </div>
        <span>Or</span>
        <label htmlFor="upload-image">
          <input
            type="file"
            accept="image/*"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <span>Choose a file</span>
        </label>
      </form>
    </>
  );
};

export default Home;
