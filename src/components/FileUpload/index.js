import React, { useEffect, useRef } from "react";

export const fileUploadContext = React.createContext([{ test: "test" }]);

const FileUpload = ({ value, ...rest }) => {
  const inputRef = useRef();

  let fileReader;
  let galleryImages = [];

  const handleFileRead = (e) => {
    const content = JSON.parse(fileReader.result).galleryImages;
    galleryImages = content;
    // console.log(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fileUploadContext = galleryImages;
    console.log(galleryImages);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <input
          type="file"
          id="upload"
          {...rest}
          ref={inputRef}
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
        <label htmlFor="upload">Загрузить</label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
