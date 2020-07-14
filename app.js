const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', "ejs");

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true,  useUnifiedTopology: true });

const itemsSchema = new Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to your todolist!"
});

const item2 = new Item ({
  name: "Hit the + button to add a new item"
});

const item3 = new Item ({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = new Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  Item.find({}, function(err, results){

    if (results.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        }
        else {
          console.log("Successfully Inserted Default Data!");
        }
      });
      res.redirect("/");
    }
    else {
      if (err){
        console.log(err);
      }
      else {
        res.render("list", {
          name: "Today",
          newListItems: results
        });
      }
    }
  });
});

app.get("/:customListName", function(req,res){

  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if (!foundList){

        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();

        res.redirect("/" + customListName);
      }
      else{
        res.render("list", {
          name: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });
});

app.post("/", function(req,res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item ({
    name: itemName
  });

  if (listName === "Today"){
      newItem.save();
      res.redirect("/");
  }
  else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = (req.body.checkbox);

  Item.findByIdAndRemove(checkedItemId, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.redirect("/");
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
