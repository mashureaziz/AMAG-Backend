const Tour = require('../models/Tour/Tour');

exports.getAllTours = async(req,res,next)=> {
  const updatedTours = await Tour.updateMany({},
    [
  {
    $set :{startDates : {$toDate : "$startDates"}}
  }]
    );
    res.send(updatedTours);
}