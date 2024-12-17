// import React, { useState } from 'react';

// function FileUpload({ onFileSelect }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];  // Lấy tệp được chọn
//     setSelectedFile(file);
//     setError(null);  // Xóa lỗi trước khi kiểm tra lại

//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Các loại tệp hợp lệ
//       if (!validTypes.includes(file.type)) {
//         setError('Vui lòng chọn tệp ảnh (JPG, PNG, GIF).');  // Thông báo lỗi nếu loại tệp không hợp lệ
//         setSelectedFile(null);  // Đặt lại trạng thái tệp đã chọn nếu không hợp lệ
//       } else {
//         onFileSelect(file);  // Gửi tệp lên App.js nếu tệp hợp lệ
//       }
//     } else {
//       setError('Vui lòng chọn một tệp ảnh để tải lên.');  // Thông báo nếu không có tệp nào được chọn
//     }
//   };

//   return (
//     <div>
//       <input 
//         type="file" 
//         accept="image/jpeg, image/png, image/gif"  // Hỗ trợ định dạng ảnh JPG, PNG, GIF
//         onChange={handleFileChange}
//       />
//       {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}  {/* Hiển thị thông báo lỗi nếu có */}
//     </div>
//   );
// }

// export default FileUpload;
import React, { useState } from 'react';

function FileUpload({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];  // Lấy tệp được chọn
    setSelectedFile(file);
    setError(null);  // Xóa lỗi trước khi kiểm tra lại

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Các loại tệp hợp lệ
      if (!validTypes.includes(file.type)) {
        setError('Vui lòng chọn tệp ảnh (JPG, PNG, GIF).');  // Thông báo lỗi nếu loại tệp không hợp lệ
        setSelectedFile(null);  // Đặt lại trạng thái tệp đã chọn nếu không hợp lệ
      } else {
        onFileSelect(file);  // Gửi tệp lên App.js nếu tệp hợp lệ
      }
    } else {
      setError('Vui lòng chọn một tệp ảnh để tải lên.');  // Thông báo nếu không có tệp nào được chọn
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/jpeg, image/png, image/gif"  // Hỗ trợ định dạng ảnh JPG, PNG, GIF
        onChange={handleFileChange}
      />
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}  {/* Hiển thị thông báo lỗi nếu có */}
    </div>
  );
}

export default FileUpload;
