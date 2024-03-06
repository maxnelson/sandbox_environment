import { useState, useEffect } from "react";

export function RowContainer(props) {
  const dragHandler = (event) => {
    console.log(event);
  };

  return (
    <>
      <div className="RowContainer">
        {props.data &&
          props.data.map((item, index) => {
            return (
              <div className="RowItem" key={index}>
                <img
                  className="draggableItemIcon"
                  src="/public/draggable_item_icon.png"
                  onDrag={dragHandler}
                />
                <p className="draggableItemText">{item.title}</p>
              </div>
            );
          })}
        <div>
          <p>Hello world</p>
        </div>
      </div>
    </>
  );
}
