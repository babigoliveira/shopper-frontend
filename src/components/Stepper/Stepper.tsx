import React, { useState } from "react";

export interface IStep {
  onNextStep: () => void;
  onPrevStep: () => void;
}

interface StepperProps<T extends IStep = IStep> {
  steps: React.ComponentType<T>[];
  onFinish: () => void;
}

const Stepper = ({ steps, onFinish }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep === steps.length - 1) {
      return onFinish();
    }

    setCurrentStep((s) => s + 1);
  };

  const prev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const Component = steps.find((_, index) => index === currentStep)!;

  return (
    <div>
      <Component key={currentStep} onNextStep={next} onPrevStep={prev} />
    </div>
  );
};

export default Stepper;
