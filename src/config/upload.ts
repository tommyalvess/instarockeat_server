import multer from "multer";
import path from "path";

const storage = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, callback) {
            callback(null, file.originalname)
        }
    })
}

export default storage;



