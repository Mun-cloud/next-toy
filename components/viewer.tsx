"use client";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import { Viewer as ToastViewer } from "@toast-ui/react-editor";

interface ViewerProps {
  value: string | null;
}

const Viewer = ({ value }: ViewerProps) => {
  return (
    <>
      <ToastViewer
        initialValue={value || ""}
        linkAttributes={{ rel: "norxeferrer noopener", target: "_blank" }}
        color="#000"
      />
    </>
  );
};

export default Viewer;
