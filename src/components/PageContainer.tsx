import { useState, useEffect } from "react";
import { fetchData } from "./fetchData";
import { RowContainer } from "./RowContainer";
import { SubComponent } from "./SubComponent";
import "../pageContainer.css";

export function PageContainer() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      setData(result);
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <SubComponent data={data} setData={setData} />
    </>
  );
}
