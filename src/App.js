import React from "react";
import Gallery from "./components/Gallery";
import DragAndDrop from "./components/DragAndDrop";
import { reducer } from "./store";
import "./App.scss";

function App() {
  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className="App">
      <div className="container">
        <Gallery storeImages={data.fileList} dispatch={dispatch} />
        <DragAndDrop data={data} dispatch={dispatch} />
        {/* <ol className="dropped-files">
          {data.fileList.map((file, index) => {
            return (
              <li key={index}>
                <img src={file} />
              </li>
            );
          })}
        </ol> */}
      </div>
    </div>
  );
}

export default App;
