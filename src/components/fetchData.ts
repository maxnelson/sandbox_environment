import { useState } from "react";
import "../pageContainer.css";

export const fetchData = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  return result.json();
}
