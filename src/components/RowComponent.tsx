import { useState, useEffect, useRef } from "react";

export const RowComponent = (props) => {
  const calculateTransform = (index) => {
    return `translate(0, ${100 * index})`;
  };

  return (
    <>
      {props.data &&
        props.data.map((item, index) => (
          <g
            className="rowContainer"
            key={item.id}
            transform={calculateTransform(index)}
            // y={100 * index}
          >
            <g
              className="imgContainer"
              onPointerDown={(e) => props.dragStart(e, index)}
            >
              <foreignObject width="30" height="30">
                <i className="fa-solid fa-bars fa-2x"></i>
              </foreignObject>
            </g>
            <g className="textContainer ">
              <text>{item.subtitle}</text>
              <text>{item.title}</text>
            </g>
          </g>
        ))}
    </>
  );
};
