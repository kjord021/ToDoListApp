const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

var itemNames = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', "ejs");

app.get("/", function(req, res) {

  let day = date();

  res.render("list", {
    day: day,
    newListItems: itemNames
  });

});

app.post("/", function(req,res){

  itemName = req.body.newItem;
  itemNames.push(itemName);

  res.redirect("/");

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
