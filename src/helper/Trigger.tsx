import React, { createContext, useState } from "react";

export type triggerType = {
   trig: number;
}

type triggerContextType = {
   trigger: triggerType
   setTrigger: React.Dispatch<React.SetStateAction<triggerType>>;
}

type triggerContextProviderProps = {
   children: React.ReactNode
}

const setDefaultValue = {
   trig: 0
}

export const Trigger = createContext({} as triggerContextType);

export const TriggerProvider = ({children}: triggerContextProviderProps) =>{
   const [trigger, setTrigger] = useState(setDefaultValue)
   return (
      <Trigger.Provider value={{trigger,setTrigger}}>
         {children}
      </Trigger.Provider>
   )

}