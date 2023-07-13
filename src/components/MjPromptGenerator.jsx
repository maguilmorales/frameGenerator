import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";

export const MjPromptGenerator = () => {
  const [industry, setIndustry] = useState("general");
  const [people, setPeople] = useState("women");
  const [ethnic, setEthnic] = useState("white");
  const [spaces, setSpaces] = useState("office");
  const [style, setStyle] = useState("hyperrealistic");
  const [lightSettings, setLightSettings] = useState("bright light");
  const [cameraSettings, setCameraSettings] = useState("kodak portra 200");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quality, setQuality] = useState("2");
  const [prompt, setPrompt] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [actions, setActions] = useState("smiling");
  const [chaos, setChaos] = useState("0");
  const [ultraDetail, setUltraDetail] = useState(false);
  const [ultraPhotoreal, setUltraPhotoreal] = useState(false);
  const [ultraRealistic, setUltraRealistic] = useState(false);
  const [Fourk, setFourk] = useState(false);
  const [eightk, setEightk] = useState(false);
  const [depth, setDepth] = useState(false);
  const [softFocus, setSoftFocus] = useState(false);
  const [focusPoint, setFocusPoint] = useState(false);
  // other state variables for the rest of the dropdowns

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(prompt)
      .then(() => {
        setCopySuccess("Copied!");
      })
      .catch((err) => {
        setCopySuccess("Failed to copy!");
      });
  };

  const industryOptions = [
    "general",
    "science",
    "real estate",
    "manufacturing",
    "automotive",
    "education",
    "legal",
    "healthcare",
    "retail" /* more options here */,
  ];
  const peopleOptions = [
    "women",
    "man",
    "group of people" /* more options here */,
  ];
  const ethnicOptions = [
    "Latin/Hispanic",
    "Black/African-American",
    "Asian",
    "American Indian",
    "White",
  ];
  const actionsOptions = [
    "smiling",
    "working",
    "laughing",
    "talking",
    "thinking",
  ];
  const spacesOptions = [
    "office",
    "lab",
    "school",
    "conference Room",
    "hospital",
    "warehouse",
    "shop" /* more options here */,
  ];
  const styleOptions = [
    "structuralist",
    "collage",
    "ilustrative",
    "painting",
    "digital",
    "hyperrealistic",
    "abstract" /* more options here */,
  ];
  const lightOptions = [
    "accent light",
    "bright light",
    "back light",
    "daylight",
    "moonlight",
    "spotlight",
  ];
  const cameraOptions = [
    "kodak portra 200",
    "Sony Alpha α7",
    "ISO1900",
    "Leica M",
    "DSLR",
    "macro lens" /* more options here */,
    ,
  ];
  const ratioOptions = ["1:1", "2:3", "3:2", "16:9"];

  const qualityOptions = [".25", ".5", "1", "2"];
  const chaosOptions = ["0", "10", "25", "50", "80"];

  // more options for the rest of the dropdowns

  const generatePrompt = () => {
    const newPrompt = `Digital color photography portrait of a ${ethnic} ${people} in a ${spaces}, ${actions}, minimal, ${style} , ${lightSettings} , shot on ${cameraSettings}, film grain, uplifting mood, ${industry} 
    ${ultraDetail ? ", ultra-detailed" : ""}
    ${ultraPhotoreal ? ", ultra-photoreal" : ""}
    ${ultraRealistic ? ", ultra-realistic" : ""}
    ${depth ? ", depth of field" : ""}
    ${softFocus ? ", soft focus" : ""}
    ${focusPoint ? ", focus point" : ""}
    ${Fourk ? ",4k" : ""}
    ${eightk ? ",8k" : ""}
    --ar ${aspectRatio} --q ${quality} --c ${chaos} `;

    setPrompt(newPrompt);
  };

  return (
    <div className="general">
      <div>
        <h2>MidJourney Prompt Generator</h2>
      </div>
      <div className="info">
        <div className="dropgroup">
        <div className="groupone">

          <Dropdown
            options={peopleOptions}
            value={people}
            setValue={setPeople}
            label="People"
          />
          <Dropdown
            options={ethnicOptions}
            value={ethnic}
            setValue={setEthnic}
            label="Ethnic"
          />
          <Dropdown
            options={spacesOptions}
            value={spaces}
            setValue={setSpaces}
            label="Spaces"
          />
          <Dropdown
            options={styleOptions}
            value={style}
            setValue={setStyle}
            label="Style"
          />
          <Dropdown
            options={lightOptions}
            value={lightSettings}
            setValue={setLightSettings}
            label="Light"
          />
          <Dropdown
            options={cameraOptions}
            value={cameraSettings}
            setValue={setCameraSettings}
            label="Camera Settings"
          />

        </div>
        <div className="grouptwo">

          <Dropdown
            options={actionsOptions}
            value={actions}
            setValue={setActions}
            label="Actions"
          />
          <Dropdown
            options={industryOptions}
            value={industry}
            setValue={setIndustry}
            label="Industry"
          />
                    <Dropdown
            options={ratioOptions}
            value={aspectRatio}
            setValue={setAspectRatio}
            label="Ratio"
          />
          <Dropdown
            options={qualityOptions}
            value={quality}
            setValue={setQuality}
            label="Quality"
          />
                    <Dropdown
            options={chaosOptions}
            value={chaos}
            setValue={setChaos}
            label="Chaos (Randomness)"
          />
        </div>
        </div>
        <div className="checkgroup">
          <div className="checks">
            <h3>Details</h3>
            <Checkbox
              label="ultra-detailed"
              checked={ultraDetail}
              onChange={(e) => setUltraDetail(e.target.checked)}
            />
            <Checkbox
              label="ultra-photoreal"
              checked={ultraPhotoreal}
              onChange={(e) => setUltraPhotoreal(e.target.checked)}
            />
            <Checkbox
              label="ultra-realistic"
              checked={ultraRealistic}
              onChange={(e) => setUltraRealistic(e.target.checked)}
            />
            <Checkbox
              label="4k"
              checked={Fourk}
              onChange={(e) => setFourk(e.target.checked)}
            />
            <Checkbox
              label="8k"
              checked={eightk}
              onChange={(e) => setEightk(e.target.checked)}
            />
          </div>

          <div className="checks">
            <h3>Focus</h3>
            <Checkbox
              label="Depth of field"
              checked={depth}
              onChange={(e) => setDepth(e.target.checked)}
            />
            <Checkbox
              label="Soft-focus"
              checked={softFocus}
              onChange={(e) => setSoftFocus(e.target.checked)}
            />
            <Checkbox
              label="Focus point"
              checked={focusPoint}
              onChange={(e) => setFocusPoint(e.target.checked)}
            />
          </div>
        </div>
      </div>

      <button className="button" onClick={generatePrompt}>
        Generate Prompt
      </button>

      <div>
        <h2>Generated Prompt:</h2>
        <p>{prompt}</p>
      </div>

      <button onClick={copyToClipboard}>Copy Prompt</button>
      {copySuccess && <div style={{ color: "green" }}>{copySuccess}</div>}
    </div>
  );
};
