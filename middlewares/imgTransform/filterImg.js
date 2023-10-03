const fileFilter = function (req, file, next) {
    if (file.mimetype.startsWith('image/')) {
        next(null, true);
    } else {
        const error = new Error('Solo se permiten archivos de imagen.');
        error.status = 400;
        next(error);
    }
};

export default fileFilter;