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

      const source = new XMLSerializer().serializeToString(svg);

      if (
        !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
      ) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns="http://www.w3.org/2000/svg"'
        );
      }
      if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
        );
      }

      //add xml declaration
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

      setSvgCode(
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source)
      );
    })();
  }, []);

  return (
    <>
      <div
        className="border border-red-666 flex flex-col max-w-min"
        ref={plate}
      >
        <div className="flex flex-col p-8">
          <div className="w-48 h-48 bg-teal-400"></div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col mb-2">
              <h1 className="text-lg">Song Name</h1>
              <h2 className="text-sm mt-[-6px]">Interpret Name</h2>
            </div>
            <LikeIcon />
          </div>
          <div className="flex flex-col">
            <div className="w-full bg-black h-1 rounded-full relative">
              <div
                className="w-2 h-2 bg-black rounded-full absolute left-11"
                style={{ transform: "translateY(-50%)", top: "50%" }}
              ></div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-xs">0:00</div>
              <div className="text-xs">3:00</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center px-6">
            <SkipButton />
            <PauseButton />
            <SkipButton isForward />
          </div>
        </div>
      </div>
      <a href={svgCode}>Download</a>
    </>
  );
}

function SkipButton({ isForward = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-player-skip-back"
      className={isForward ? "transform rotate-180" : ""}
      width="30"
      height="30"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="black"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 5v14l-12 -7z" />
      <line x1="4" y1="5" x2="4" y2="19" />
    </svg>
  );
}

function PauseButton() {
  return (
    <div className="rounded-full border border-black p-[7px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-player-pause"
        width="27"
        height="27"
        viewBox="0 0 24 24"
        stroke="black"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    </div>
  );
}

function LikeIcon() {
  return (
    <svg
      className="mt-1"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        fill="black"
        d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
      />
    </svg>
  );
}

export default App;
