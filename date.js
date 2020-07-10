
exports.getDate = function() {

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  const date = new Date();
  return date.toLocaleDateString("en-US", options);
}

exports.getDay = function() {

  const options = {
    weekday: "long"
  };

  const date = new Date();
  return date.toLocaleDateString("en-US", options);
}
