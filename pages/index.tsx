import type { NextPage } from "next";

const Home: NextPage = () => {
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const json = await response.json();
    console.log(json);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    file && uploadImage(file);
  };
  return (
    <>
      <form>
        <div>
          <h1>Upload your image</h1>
          <p>File should be Jpeg, Png...</p>
        </div>
        <div>
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
