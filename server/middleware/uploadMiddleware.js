// const multer = require("multer");
// const path = require("path");

// // Storage Configuration 
// //save uploded file in  computer disk
// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {

//         const uniqueName = Date.now() + path.extname(file.originalname);

//         cb(null, uniqueName);

//     }

// });

// // File Filter
// const fileFilter = (req, file, cb) => {

//     const allowedTypes = /pdf|doc|docx/;

//     const extName = allowedTypes.test(
//         path.extname(file.originalname).toLowerCase()
//     );

//     if (extName) {

//         cb(null, true);

//     } else {

//         cb(new Error("Only PDF, DOC and DOCX files are allowed"));

//     }

// };

// // Upload Middleware
// const upload = multer({

//     storage,

//     fileFilter,

//     limits:{

//         fileSize:5 * 1024 * 1024

//     }

// });

// module.exports = upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder automatically
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /pdf|doc|docx/;

    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (extName) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC and DOCX files are allowed"));
    }

};

// Upload Middleware
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});

module.exports = upload;