import Image from "next/image";
import type { NextPage } from "next";
import { useState } from "react";
import Button from "./components/Button";
import UploadForm from "./components/UploadForm";
import ProgressBar from "./components/ProgressBar";
import { MdCheckCircle } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

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

  const handleCopyClick = () => {
    image && navigator.clipboard.writeText(image);
    toast.success("Copied to clipboard");
  };

  if (loading)
    return (
      <Container>
        <div className="flex flex-col gap-7 w-80">
          <p className="text-lg text-gray-2">Uploading...</p>
          <ProgressBar />
        </div>
      </Container>
    );

  if (image) {
    return (
      <Container>
        <Toaster />
        <div className="flex flex-col w-96 gap-4 items-center">
          <MdCheckCircle className="text-success" size={35} />
          <h3 className="text-lg text-gray-2">Uploaded Successfully!</h3>
          <div className="overflow-hidden rounded-xl relative w-full h-80 my-4">
            <Image
              src={image}
              layout="fill"
              alt="Uploaded image"
              objectFit="cover"
              priority
              placeholder="blur"
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
          <div className="flex w-full items-center gap-4 bg-neutral-100 p-0.5 border border-gray-5 rounded-lg">
            <input
              readOnly
              className="overflow-hidden text-ellipsis text-[8px] text-gray-2 flex-1 ml-1.5 resize-none"
              defaultValue={image}
              type="text"
            />
            <Button onClick={handleCopyClick}>
              <span className="text-[8px]">Copy Link</span>
            </Button>
          </div>
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
