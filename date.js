
module.exports = getDate;

function getDate() {
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let date = new Date();
  let day = date.toLocaleDateString("en-US", options);

  return day;
}
