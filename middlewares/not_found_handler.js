const notFoundHandler = (req, res, next) => {
    res.status(404).json({ 
        success: false,
        message: `${req.method} - ${req.url} - Not Found`
    })
}
export default notFoundHandler;