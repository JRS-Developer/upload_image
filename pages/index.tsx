import type { NextPage } from "next";

const Home: NextPage = () => {
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
          />
          <span>Choose a file</span>
        </label>
      </form>
    </>
  );
};

export default Home;
