import React from "react";
import FileUpload, { fileUploadContext } from "./components/FileUpload";
import Gallery from "./components/Gallery";

function App() {
  return (
    <div className="App">
      <fileUploadContext.Provider>
        <FileUpload />
        <Gallery />
      </fileUploadContext.Provider>
    </div>
  );
}

export default App;
