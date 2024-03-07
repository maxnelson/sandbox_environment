import { useState, useEffect } from "react";

export function RowContainer(props) {
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const mouseDownHandler = (event: React.MouseEvent<HTMLElement>) => {
    console.log("mouse down");
  };
  const mouseMoveHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.target.parentElement.style.transform =
      "translate(0px, " + event.nativeEvent.offsetY + "px)";
  };
  const mouseUpHandler = (event: React.MouseEvent<HTMLElement>) => {
    console.log("mouse up");
  };

  const handleDragStart = (e) => {
    const { clientY } = e;
    setInitialPosition(clientY);
    e.dataTransfer.setData("text/plain", null);
    e.dataTransfer.dropEffect = "move";
  };

  const dragHandler = (event: React.DragEvent<HTMLImageElement>) => {
    console.log("movement Y");
    console.log(event.nativeEvent.movementY);
    console.log("client Y");
    console.log(event.nativeEvent.clientY);
    event.target.parentElement.style.transform =
      "translate(0px, " + event.nativeEvent.movementY + "px)";
  };
  const handleDragEnd = (e) => {
    const finalPosition = currentPosition - initialPosition;
    //onDragEnd(index, finalPosition);
    setInitialPosition(null);
    setCurrentPosition(null);
  };

  //change its y position to be the current drag y position
  //measure where the row in front of it is
  //measure the row behind it
  //if it surpasses the bottom of the row in front of it, move it down, and move that row up
  //if it surpasses the top of the row behind it, move it up, and move that row down

  return (
    <>
      <div className="RowContainer">
        {props.data &&
          props.data.map((item, index) => {
            return (
              <div className="RowItem" draggable="true" key={item.id}>
                <div
                  className="draggableItemIcon"
                  draggable="true"
                  //onMouseDown={mouseDownHandler}
                  //onMouseMove={mouseMoveHandler}
                  //onMouseUp={mouseUpHandler}
                  //onDragStart={dragHandler}

                  onDragStart={handleDragStart}
                  onDrag={dragHandler}
                  onDragEnd={handleDragEnd}
                >
                  <i className="fa-solid fa-circle"></i>
                </div>
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
