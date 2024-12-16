import React, { useState } from 'react';

function FileUpload({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError(null);

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (!validTypes.includes(file.type)) {
        setError('Vui lòng chọn tệp ảnh (JPG, PNG) hoặc video (MP4).');
        setSelectedFile(null);
      } else {
        // Pass selected file to the parent component
        onFileSelect(file);
      }
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/jpeg, image/png, video/mp4" 
        onChange={handleFileChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default FileUpload;