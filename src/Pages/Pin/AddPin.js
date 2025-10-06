import React, { useState } from "react";

import PinStep1 from "./Steps/PinStep1";
import PinStep2 from "./Steps/PinStep2";
import PinStepFinal from "./Steps/PinStepFinal";
import { useLocation } from "react-router-dom";

const steps = [PinStep1, PinStep2, PinStepFinal];

const AddPin = () => {
  const location = useLocation();

  const [currStep, setCurrStep] = useState(0);
  const [pinData, setPinData] = useState({
    recordId: location.state ? location.state.recordId : null,
  });

  const StepComponent = steps[currStep];
  const nextStep = () => setCurrStep((s) => s + 1);
  const prevStep = () => setCurrStep((s) => s - 1);

  return (
    <>
      <StepComponent
        pinData={pinData}
        setPinData={setPinData}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </>
  );
};

export default AddPin;
