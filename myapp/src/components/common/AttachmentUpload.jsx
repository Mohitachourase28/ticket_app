/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";

function AttachmentUpload() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mb-6 mt-4">
      <h3 className="font-semibold text-lg mb-2">Attachments</h3>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600 bg-gray-50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-sm">
          <span className="font-medium text-gray-700">
            Drag and drop files here
          </span>
          , or{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => fileInputRef.current.click()}
          >
            browse
          </span>
        </p>
        <p className="text-xs text-gray-400">Maximum file size: 10MB</p>
        <input
          type="file"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        {files.length > 0 && (
          <div className="mt-4 text-left">
            <h4 className="font-medium text-sm mb-2">Selected Files:</h4>
            <ul className="text-sm list-disc ml-4">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AttachmentUpload;
