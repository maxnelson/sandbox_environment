import { useState, useEffect, useRef } from "react";
import { RowComponent } from "./RowComponent";
export const SubComponent = (props) => {
  const [isDragging, setIsDragging] = useState();
  const containerRef = useRef();

  function dragStart(e, index) {
    //Set isDragging state variable to have a value of the index of the item being dragged.
    setIsDragging(index);
    //Get the current container element
    const container = containerRef.current;
    //Unpack the current container element into a list of child nodes
    const htmlNodeArray = [...container.childNodes];
    //create a variable equal to the current child node being dragged
    const dragItem = htmlNodeArray[index];
    //create a variable equal to the list of child nodes beneath the current child node being dragged
    const itemsBelowDragItem = htmlNodeArray.slice(index + 1);
    //create a variable equal to the list of child nodes that are not the current child node being dragged
    const notDragItems = htmlNodeArray.filter((_, i) => i !== index);
    //create a variable equal to the item  in the data object item with the same index as the current child node being dragged
    const dragData = props.data[index];
    //create a variable equal to the destructured list of data from the props object
    let newData = [...props.data];

    // set variable equal to the distance between two htmlNodes
    const space =
      htmlNodeArray[1].getBoundingClientRect().top -
      htmlNodeArray[0].getBoundingClientRect().bottom;

    // setvariable equal to the BoundingClientRect of dragItem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    // set style for dragItem when mouse down
    dragItem.style.position = "fixed";
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingRect.width + "px";
    dragItem.style.height = dragBoundingRect.height + "px";
    dragItem.style.top = dragBoundingRect.top + "px";
    dragItem.style.left = dragBoundingRect.left + "px";
    dragItem.style.cursor = "grabbing";

    // create alternate div element when dragItem position is fixed
    const div = document.createElement("div");
    div.id = "div-temp";
    div.style.width = dragBoundingRect.width + "px";
    div.style.height = dragBoundingRect.height + "px";
    div.style.pointerEvents = "none";
    container.appendChild(div);

    // set variable equal to the height of the current drag item plus the amount of space between two nodes
    const distance = dragBoundingRect.height + space;
    // set the position of each of the items below the current drag node to be equal to the distance variable
    itemsBelowDragItem.forEach((item) => {
      item.style.transform = `translateY(${distance}px)`;
    });
    // get the original coordinates of the mouse pointer
    let x = e.clientX;
    let y = e.clientY;

    debugger;
    // set the listener for dragmovement and evoke the dragMove function when it occurs
    document.onpointermove = dragMove;

    //define the dragmove function
    function dragMove(e) {
      // Calculate the distance the mouse pointer has traveled by subtracting the original coordinates from the current coordinates
      const posX = e.clientX - x;
      const posY = e.clientY - y;
      //set the translate property of the dragItem to be equal to the distance the mouse pointer has traveled
      dragItem.style.transform = `translate(0px, ${posY}px)`;
      // swap position and data
      notDragItems.forEach((item) => {
        // check two elements is overlapping.
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();

        let isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y;

        if (isOverlapping) {
          // Swap Position Card
          if (item.getAttribute("style")) {
            item.style.transform = "";
            index++;
          } else {
            item.style.transform = `translateY(${distance}px)`;
            index--;
          }

          // Swap Data
          newData = props.data.filter((item) => {
            return item.id !== dragData.id;
          });
          newData.splice(index, 0, dragData);
        }
      });
    }

    // finish onPointerDown event
    document.onpointerup = dragEnd;

    function dragEnd() {
      document.onpointerup = "";
      document.onpointermove = "";

      dragItem.style = "";
      container.removeChild(div);

      htmlNodeArray.forEach((item) => (item.style = ""));

      setIsDragging(undefined);
      props.setData(newData);
    }
  }

  return (
    <svg className="container" ref={containerRef} height={1000}>
      <RowComponent
        data={props.data}
        dragStart={dragStart}
        isDragging={isDragging}
      />
    </svg>
  );
};
