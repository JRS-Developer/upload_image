import Image from "next/image";
import type { NextPage } from "next";
import { useState } from "react";
import Button from "./components/Button";
import UploadForm from "./components/UploadForm";
import ProgressBar from "./components/ProgressBar";

interface UploadImgResponse {
  url: string;
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex justify-center items-center">
    <div className="shadow-md px-8 py-9 rounded-lg">{children}</div>
  </div>
);

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
      <Container>
        <div className="flex flex-col gap-7">
          <p className="text-lg">Uploading...</p>
          <ProgressBar />
        </div>
      </Container>
    );

  if (image) {
    return (
      <Container>
        <h3>Uploaded Successfully!</h3>
        <Image src={image} height={500} width={500} alt="Uploaded image" />
        <div>
          <p>{image}</p>
          <Button onClick={handleCopyClick}>Copy Link</Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <UploadForm onChange={handleChange} onDrop={handleDrop} />
      </Container>
    </>
  );
};

export default Home;
