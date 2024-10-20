import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import TableHandler, { rewirteFormats } from "quill1.3.7-table-module";
import "quill1.3.7-table-module/dist/index.css";
import "react-quill/dist/quill.snow.css";
import "./App.css";

Quill.register({ [`modules/${TableHandler.moduleName}`]: TableHandler }, true);
rewirteFormats();

function App() {
  const [text, setText] = useState("");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      [TableHandler.toolName], // Custom table tool
    ],
    [`${TableHandler.moduleName}`]: {},
    // Additional modules can be added here
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const cancelButton = document.querySelector(".create_control_btn.cancel");
      if (cancelButton) {
        cancelButton.remove();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const customSelectButton = document.querySelector(".create_select_custom");
    if (customSelectButton) {
      const tableButton = document.querySelector(".ql-table");
      if (tableButton) {
        tableButton.addEventListener("click", () => {
          customSelectButton.click();
        });
      }
      const customSelectDiv = document.querySelector(".ql-custom-select");
      if (customSelectDiv) {
        customSelectDiv.style.display = "none";
      }
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ReactQuill
          value={text}
          onChange={setText}
          modules={modules}
          theme="snow"
        />
      </header>
    </div>
  );
}

export default App;
