import React, { useState, useRef } from "react";
import { action } from "@storybook/addon-actions";
import Reader from "../lib";

const Wrapper = ({ selectFacingMode, selectDelay, legacyMode, onAndOff }) => {
  const [facingMode, setFacingMode] = useState("user");
  const [delay, setDelay] = useState(500);
  const [isOn, setIsOn] = useState(true);
  const readerRef = useRef(null);

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      {onAndOff && (
        <button onClick={() => setIsOn(!isOn)}>
          {isOn ? "Turn off" : "Turn on"}
        </button>
      )}
      {selectFacingMode && (
        <select onChange={(e) => setFacingMode(e.target.value)}>
          <option value="user">User</option>
          <option value="environment">Environment</option>
        </select>
      )}
      {selectDelay && (
        <div>
          <button onClick={() => setDelay(false)}>Disable Delay</button>
          <input
            placeholder="Delay in ms"
            type="number"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
          />
        </div>
      )}
      {isOn && (
        <Reader
          onError={action("Error")}
          onScan={action("Scan")}
          onLoad={action("Load")}
          onImageLoad={action("ImageLoad")}
          ref={readerRef}
          facingMode={facingMode}
          legacyMode={legacyMode}
          maxImageSize={1000}
          delay={delay}
          className="reader-container"
        />
      )}
      {legacyMode && (
        <button onClick={() => readerRef.current.openImageDialog()}>
          Open Image Dialog
        </button>
      )}
    </div>
  );
};

export default {
  title: "QR Reader",
};

export const FacingModeNotSpecified = {
  render: () => <Wrapper />,
  name: "FacingMode not specified",
};

export const ChooseFacingMode = {
  render: () => <Wrapper selectFacingMode />,
  name: "Choose facingMode",
};

export const LegacyMode = {
  render: () => <Wrapper legacyMode />,
  name: "Legacy mode",
};

export const ChooseDelay = {
  render: () => <Wrapper selectDelay />,
  name: "Choose delay",
};

export const OnAndOff = {
  render: () => <Wrapper onAndOff />,
  name: "On and off",
};
