import { ReactNode, useEffect } from "react";
import { useRapidStepsContext } from "../hooks/useRapidStepsContext";
import React from "react";

interface RapidStepsWrapperProps {
  children: ReactNode[];
}

const RapidStepsWrapper = ({
  children
}: RapidStepsWrapperProps) => {
  const rapidStepsMethods = useRapidStepsContext();
  const currentStep = rapidStepsMethods?.currentStep ?? 0;
  useEffect(() => {
    rapidStepsMethods?.setNumberOfSteps(children.length);
  }, [children.length, rapidStepsMethods])

  return (
    <>{children[currentStep]}</>
  );
}

export default RapidStepsWrapper;
