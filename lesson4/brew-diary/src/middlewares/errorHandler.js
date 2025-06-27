export const errorHandler = (err, req, res, next) => {
    console.error(err);
    req.log.error({err});

    res.status(err.status || 500).json({error: err.message || 'Server error'})
}