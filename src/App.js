import React from "react";
import Gallery from "./components/Gallery";
import DragAndDrop from "./components/DragAndDrop";
import { reducer } from "./store/store";
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
        <DragAndDrop data={data} dispatch={dispatch}>
          <Gallery storeImages={data.fileList} dispatch={dispatch} />
        </DragAndDrop>
      </div>
    </div>
  );
}

export default App;
