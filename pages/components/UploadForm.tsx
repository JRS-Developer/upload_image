import Image from "next/image";
import Button from "./Button";

interface Props {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadForm = ({ onDrop, onChange }: Props) => (
  <form className="flex flex-col items-center gap-4">
    <div className="flex flex-col text-center gap-4 mb-3">
      <h1 className="text-gray-2 text-lg">Upload your image</h1>
      <p className="text-gray-3 text-[10px]">File should be Jpeg, Png...</p>
    </div>
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="flex flex-col items-center p-8 outline-2 outline-blue-400/50 outline-dashed rounded-xl w-80 gap-9 bg-neutral-100 select-none"
    >
      <div className="pointer-events-none">
        <Image src="/upload.svg" alt="" width={115} height={90} />
      </div>
      <p className="text-gray-4 text-xs">Drag & Drop your image here</p>
    </div>
    <span className="text-gray-4 text-xs">Or</span>
    <label htmlFor="upload-image">
      <input
        type="file"
        accept="image/*"
        id="upload-image"
        className="sr-only"
        onChange={onChange}
      />
      <Button component="span" variant="success">
        Choose a file
      </Button>
    </label>
  </form>
);

export default UploadForm;
