import { useEffect, useRef, useState } from "react";
import { elementToSVG, inlineResources } from "dom-to-svg";

function App() {
  return (
    <div>
      <SongPlate />
    </div>
  );
}

function SongPlate() {
  const plate = useRef();

  const [svgCode, setSvgCode] = useState("");

  useEffect(() => {
    (async () => {
      const svg = elementToSVG(plate.current);

      await inlineResources(svg.documentElement);

      setSvgCode(new XMLSerializer().serializeToString(svg));
    })();
  }, []);

  return (
    <>
      <div
        className=""
        style={{
          backgroundColor: "red",
          borderColor: "green",
          display: "flex",
        }}
        ref={plate}
      >
        <div
          style={{
            width: 200,
            height: 200,
            padding: 20,
            margin: 20,
            backgroundColor: "blue",
          }}
        >
          Hello Word
        </div>
      </div>
      {svgCode}
    </>
  );
}

export default App;
