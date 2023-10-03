import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import "font-awesome/css/font-awesome.min.css";
import { ListInputUI } from "./ListInput";
import { ListDisplay } from "./listDisplay";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export function ToDoList({ data }) {
  const [state, setState] = useState({
    items: data,
    nextItem: "",
  });


  const itemAdder = (x) => {
    if (x == null) {
      if (state.nextItem) {
        // Check exist
        const isItemAlreadyExists = state.items.some(
          (item) => item.description === state.nextItem
        );

        if (!isItemAlreadyExists) {
          setState((prevState) => ({
            nextItem: "",
            items: prevState.items?.concat({
              description: state.nextItem,
              isCompleted: false,
            }),
          }));
        } else {
          alert("Item already exists");
        }
      }
    } else {
      const newItem = {
        description: x.description,
        isCompleted: x.isCompleted,
      };

      // Check if the item already exists in the list
      const isItemAlreadyExists = state.items.some(
        (item) => item.description === newItem.description
      );

      if (!isItemAlreadyExists) {
        setState((prevState) => ({
          nextItem: "",
          // Add the new item to the existing items array
          items: [...prevState.items, newItem],
        }));
      } else {
        alert("Item already exists");
      }
    }
  };

  const itemRemover = (removeIndex) => {
    //todo remove item by index from list
    if (removeIndex >= 0) {
      const updatedItems = [
        ...state.items.slice(0, removeIndex),
        ...state.items.slice(removeIndex + 1),
      ];
      setState((prevState) => ({
        nextItem: prevState.nextItem,
        items: updatedItems,
      }));
    }

    axios
      .post(`http://localhost:8081/todolist/delete/${removeIndex}`)
      .then((response) => {
        alert("Item Remove successfuly");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const itemCompleter = (event, indexToComplete) => {
    function completeItem(myarray, indexToComplete) {
      return myarray.map(function (elem, index) {
        if (index === indexToComplete) elem.isCompleted = !elem.isCompleted;
        return elem;
      });
    }
    const editedItems = completeItem(state.items, indexToComplete);

    setState((prevState) => ({
      nextItem: prevState.nextItem,
      items: [...editedItems],
    }));
  };

  const itemInputChange = (e) => {
    setState((prevState) => ({
      nextItem: e.target.value,
      items: prevState.items,
    }));
  };

  const handleSave = () => {
    axios
      .get("http://localhost:8081/list")
      .then((response) => {
        const existingItems = response.data.list;
  
        // Filter out items that already exist in the API
        const newItems = state.items.filter((item) => {
          return !existingItems.some((existingItem) =>
            existingItem.description === item.description
          );
        });
  
        // Send only the non-repetitive items to the API
        newItems.forEach((newItem) => {
          axios
            .post("http://localhost:8081/todolist/add", {
              description: newItem.description,
              isCompleted: newItem.isCompleted,
            })
            .then((response) => {
              alert("added successfully . . .")
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  };
  


  

  function loadData() {
    axios
      .get("http://localhost:8081/list")
      .then((response) => {
        const data = response.data.list;
        for (var i = 0; i < data.length; i++) {
          const x = {
            description: data[i].description,
            isCompleted: data[i].isCompleted,
          };
          itemAdder(x);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    return () => {
      loadData();
    };
  }, []);

  return (
    <>
      <div className="listContainer">
        <ListInputUI
          itemAdder={itemAdder}
          getInputValue={itemInputChange}
          nextItem={state.nextItem}
        />
        <ListDisplay
          listItems={state.items}
          itemRemover={itemRemover}
          itemCompleter={itemCompleter}
        />
      </div>

      <div
        className="row col-12 justify-content-center"
        style={{ position: "relative" }}
      >
        <Button
          className="col-2"
          style={{
            position: "absolute",
            top: "-55px",
            left: "67%",
            fontSize: "14px",
            height: "55px",
            backgroundColor: "#333cff",
            border: "none",
          }}
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </div>
    </>
  );
}
