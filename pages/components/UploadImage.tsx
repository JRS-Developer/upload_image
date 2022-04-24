import Image from "next/image";

interface Props {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const UploadImage = ({ onDrop }: Props) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={onDrop}
      className="flex flex-col items-center p-8 outline-2 outline-blue-400/50 outline-dashed rounded-xl gap-9 bg-neutral-100 select-none transition-opacity"
    >
      <div className="pointer-events-none">
        <Image src="/upload.svg" alt="" width={115} height={90} priority />
      </div>
      <p className="text-gray-4 text-xs text-center 2xl:text-sm">
        Drag & Drop your image here
      </p>
    </div>
  );
};

export default UploadImage;
