const multer = require('multer');
const path = require('path');
const createError = require('http-errors');

const uploader = (sub_folder, file_type, file_size, error) => {
    const uploader_folder = `${__dirname}/../public/uploads/${sub_folder}/`;

    // storage 
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, uploader_folder);
        },
        filename: (req, file, callback) => {
            const extName = path.extname(file.originalname);
            const fileName = `${file.originalname.replace(extName, "").toLowerCase().split(" ").join("-")}-${Date.now()}`;

            callback(null, `${fileName}${extName}`);
        }
    });

    // upload object
    const upload = multer({
        storage,
        limits: {
            fileSize: file_size
        },
        fileFilter: (req, file, callback) => {
            if (file_type.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(createError(error));
            }
        }
    })

    return upload;
}


module.exports = uploader;