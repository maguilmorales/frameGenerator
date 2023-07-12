import React, { useState } from "react";
import Dropdown from "./Dropdown";

export const MjPromptGenerator = () => {
  const [industry, setIndustry] = useState("general");
  const [people, setPeople] = useState("women");
  const [spaces, setSpaces] = useState("office");
  const [style, setStyle] = useState("hyperrealistic");
  const [lightSettings, setLightSettings] = useState("bright light");
  const [cameraSettings, setCameraSettings] = useState("kodak portra 200");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [quantityNumber, setQuantity] = useState("4");
  const [quality, setQuality] = useState("ultra-photoreal");
  const [prompt, setPrompt] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  // other state variables for the rest of the dropdowns

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt)
      .then(() => {
        setCopySuccess('Copied!');
      })
      .catch(err => {
        setCopySuccess('Failed to copy!');
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
    'Sony Alpha α7',
    'ISO1900',
    'Leica M',
    "DSLR",
    'depth of field',
    "macro lens", /* more options here */,
  ];
  const ratioOptions = ["1:1", "1:2", '1:3', "2:1", "3:2", '4:3', '16:9', '5:1'];
  const quantity = ["1", "2", "3", "4"];
  const qualityOptions = ["4K", "8k", "ultra-detailed", "ultra-photoreal", 'ultra-realistic'];

  // more options for the rest of the dropdowns

  const generatePrompt = () => {
    const newPrompt = `Digital color photography portrait of a ${people} in a ${spaces}, smiling, minimal, ${style} , ${lightSettings} , shot on ${cameraSettings}, film grain, uplifting mood, ${industry} --ar ${aspectRatio} --q ${quantityNumber} ,${quality}`;
    setPrompt(newPrompt);
  };

  return (
    <div className="info">
        <div> <h1>MidJourney Prompt Generator</h1> </div>
    
      <Dropdown
        options={industryOptions}
        value={industry}
        setValue={setIndustry}
        label="Industry"
      />
      <Dropdown
        options={peopleOptions}
        value={people}
        setValue={setPeople}
        label="People"
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
    options={quantity}
    value={quantityNumber}
    setValue={setQuantity}
    label="Quantity"
/>
      {/* More dropdowns for the rest of the options */}

      <button onClick={generatePrompt}>Generate Prompt</button>

      <div>
        <h2>Generated Prompt:</h2>
        <p>{prompt}</p>
      </div>

      <button onClick={copyToClipboard}>Copy Prompt</button>
{copySuccess && <div style={{color: 'green'}}>{copySuccess}</div>}

    </div>
  );
};
