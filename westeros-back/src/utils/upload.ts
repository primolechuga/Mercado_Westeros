import multer from 'multer';
import fs from 'fs';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Obtener el tipo de upload del request
    const uploadType = req.params.type; // 'products', 'profiles', etc.
    console.log(uploadType);
    const uploadPath = `uploads/${uploadType}`;
    
    // Verificar que la carpeta existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
  }
});