const handleError = (err,req,res,next)=> {
        //For a production build error logs will sent to a error logging service
        console.log(err.message);
        res.status(500).send('Something went wrong. Please try again with valid data');
}

module.exports = {
    handleError
}