import React, { useState } from "react";

import PinStep1 from "./Steps/PinStep1";
import PinStep2 from "./Steps/PinStep2";
import PinStepFinal from "./Steps/PinStepFinal";
import { useLocation } from "react-router-dom";
import TitleHeader from "../../Components/TitleHeader";

const steps = [PinStep1, PinStep2, PinStepFinal];

const AddPin = () => {
  const location = useLocation();

  const isWish = location.state?.isWish ?? false;
  const [currStep, setCurrStep] = useState(0);
  const [pinData, setPinData] = useState({
    ...(location.state?.recordId && { recordId: location.state.recordId }),
    //isWish값과 상관 없이, location.state에 recordId가 있으면 pinData에 포함
  });

  const StepComponent = steps[currStep];
  const nextStep = () => setCurrStep((s) => s + 1);
  const prevStep = () => setCurrStep((s) => s - 1);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TitleHeader title={"장소 추가"} prevStep={prevStep} step={currStep} />
      </div>

      <StepComponent
        pinData={pinData}
        setPinData={setPinData}
        nextStep={nextStep}
        prevStep={prevStep}
        isWishPage={isWish}
      />
    </>
  );
};

export default AddPin;
