import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/proxy");
        if (!response.ok)
          throw new Error("There was an error fetching the data");

        const text = await response.text();
        console.log(text);
        setData(text);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>React + Node.js Proxy</h1>
      <pre>{data}</pre>
    </div>
  );
}

export default App;
