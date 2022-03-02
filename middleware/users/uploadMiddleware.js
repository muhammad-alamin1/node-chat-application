const uploader = require("../../utilities/singleUploader");

const uploadMiddleware = (req, res, next) => {
    const upload = uploader(
        "avatars", ["image/jpeg", "image/png", "image/jpg"],
        1000000,
        "Only jpeg, png, and jpg are allowed.!"
    );

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    }
                }
            })
        } else {
            next();
        }
    });
}


module.exports = uploadMiddleware;