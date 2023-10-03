const express = require("express");
const list = require("./list.json");
const bodyparser = require("body-parser");
const cors = require("cors");
const fs = require('fs')
const app = express();
const port = 8081;
app.use(bodyparser.json())
app.use(cors());


app.get("/list", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(list);
});


app.post("/todolist/add", (req, res) => {
 // Extract data from the request body
 const newItem = {
  description: req.body.description,
  isCompleted: req.body.isCompleted || false, // Set default value if not provided
};

if(newItem.description )

// Push the new item to the list array
list.list.push(newItem);

// Write the updated list to the JSON file
fs.writeFile("list.json", JSON.stringify(list, null, 2), (err) => {
  if (err) {
    console.error("Error writing to list.json:", err);
    res.status(500).json({ error: "Error adding data" });
  } else {
    res.status(200).json({ message: "Data added successfully" });
  }
});
});

app.post("/todolist/delete/:index", (req, res) => {
  const indexToDelete = parseInt(req.params.index);

  // Remove the item from the list array
  list.list.splice(indexToDelete, 1);

  // Write the updated list to the JSON file
  fs.writeFile("list.json", JSON.stringify(list, null, 2), (err) => {
    if (err) {
      console.error("Error writing to list.json:", err);
      res.status(500).json({ error: "Error deleting data" });
    } else {
      res.status(200).json({ message: "Data deleted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

