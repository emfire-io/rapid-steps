import { ReactElement, createContext, useContext } from "react";
import useRapidSteps from "./useRapidSteps";
import React from "react";

type TUseRapidStepsMethods = ReturnType<typeof useRapidSteps>;
interface IRapidStepsProviderProps extends TUseRapidStepsMethods {
  children?: ReactElement;
}

export const RapidStepsContext = createContext<null | TUseRapidStepsMethods>(null);

export const useRapidStepsContext = () => useContext(RapidStepsContext);

export const RapidStepsProvider = (props: IRapidStepsProviderProps) => (
  <RapidStepsContext.Provider value={props}>
    {props.children}
  </RapidStepsContext.Provider>
)