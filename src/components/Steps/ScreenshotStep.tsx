import React, { useContext } from "react";

import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import Screenshot from "@/components/Screenshot/Screenshot";
import { Button } from "@nextui-org/react";
import { IStep } from "@/components/Stepper/Stepper";

interface ScreenshotStepProps extends IStep {}

const ScreenshotStep = ({ onPrevStep, onNextStep }: ScreenshotStepProps) => {
  const store = useContext(AppStoreContext);

  const { update } = useStore(store!);

  const handleCapture = (imageData: string) => {
    update({ measurePicture: imageData });
    onNextStep();
  };

  return (
    <div>
      <Screenshot onCapture={handleCapture} />
      <Button className="mt-4" onClick={onPrevStep}>
        Voltar
      </Button>
    </div>
  );
};

export default ScreenshotStep;
