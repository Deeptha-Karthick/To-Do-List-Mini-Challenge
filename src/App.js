import "./styles.css";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(null);

  const handleSubmit = () => {
    const newList = [...list, { toDo: input, isDisabled: false }];
    setList(newList);
    setInput("");
  };

  const handleCancel = () => {
    setInput("");
  };

  const handleEdit = (el, index) => {
    setInput(el.toDo);
    setIsUpdate(index);
  };

  const handleUpdate = () => {
    setList((prev) =>
      prev.map(
        (item, index) =>
          index === isUpdate
            ? { ...item, toDo: input } // Update the `toDo` for the matched index
            : item // Keep other items unchanged
      )
    );
    setInput("");
    setIsUpdate(null);
  };

  const handleDelete = (indexValue) => {
    setList((prev) => prev.filter((el, index) => index !== indexValue));
  };

  const onDoubleClick = (obj, objIndex) => {
    setList((prev) => {
      return prev.map((el, index) => {
        return objIndex === index ? { ...el, isDisabled: !el.isDisabled } : el;
      });
    });
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="to-do-container">
        <div className="input">
          <input
            type="text"
            placeholder="Enter your to do"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button
            onClick={isUpdate !== null ? handleUpdate : handleSubmit}
            disabled={input.length === 0}
          >
            {isUpdate !== null ? "Update" : "Submit"}{" "}
          </button>
          <button onClick={handleCancel} disabled={input.length === 0}>
            Cancel{" "}
          </button>
        </div>
      </div>
      <p>
        <i>Double click on todo to toggle completion status </i>
      </p>
      {list.length !== 0 && (
        <div className="to-do-list">
          {list?.map((el, index) => {
            return (
              <div className="list-item">
                <div
                  className={`list-text ${
                    el.isDisabled === true ? "disabled" : ""
                  }`}
                  onDoubleClick={() => onDoubleClick(el, index)}
                >
                  {el.toDo}
                </div>
                <div className="list-actions">
                  <button
                    className="edit"
                    onClick={() => handleEdit(el, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
