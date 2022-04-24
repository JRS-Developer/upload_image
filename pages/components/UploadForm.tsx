import Button from "./Button";
import UploadImage from "./UploadImage";

interface Props {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadForm = ({ onDrop, onChange }: Props) => (
  <form className="flex flex-col items-center gap-4 sm:w-80">
    <div className="flex flex-col text-center gap-4 mb-3">
      <h1 className="text-gray-2 text-lg 2xl:text-xl">Upload your image</h1>
      <p className="text-gray-3 text-[10px] 2xl:text-xs">
        File should be Jpeg, Png...
      </p>
    </div>
    <div className="w-full">
      <UploadImage onDrop={onDrop} />
    </div>
    <span className="text-gray-4 text-xs 2xl:text-sm">Or</span>
    <label htmlFor="upload-image">
      <input
        type="file"
        accept="image/*"
        id="upload-image"
        className="sr-only"
        onChange={onChange}
      />
      <Button component="span" variant="primary">
        Choose a file
      </Button>
    </label>
  </form>
);

export default UploadForm;
