// Display audit time to desired utc offset
function convertDate(utcoffSet,timestamp) {
  let newtime = new Date(timestamp);
  newtime.setHours(newtime.getHours() + utcoffSet);

  const convertedTime = newtime.toLocaleString("en-GB", { timeZone: "UTC" });
  return convertedTime;
}

module.exports = {
    convertDate
}
