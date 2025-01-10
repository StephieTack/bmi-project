import React, { useRef, useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonAlert,
} from "@ionic/react";
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";
import "@ionic/react/css/core.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg");

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError("Please enter valid non-negative numbers");
      return;
    }
    const weightConversionFactor = calcUnits === "ftlbs" ? 2.2 : 1;
    const heightConversionFactor = calcUnits === "ftlbs" ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (selectedValue: "mkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: "okay",
            handler: () => {
              clearError;
            },
          },
        ]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <InputControl
            selectedValue={calcUnits}
            onSelectValue={selectCalcUnitHandler}
          />
          <IonList>
            <IonItem>
              <IonInput
                type="number"
                label={
                  calcUnits === "mkg"
                    ? "Your Height (meters)"
                    : "Your Height (feet)"
                }
                label-placement="floating"
                placeholder={calcUnits === "mkg" ? "meters" : "feet"}
                ref={heightInputRef}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type="number"
                label={
                  calcUnits === "mkg" ? "Your Weight (kg)" : "Your Weight (lbs)"
                }
                label-placement="floating"
                placeholder={calcUnits === "mkg" ? "kg" : "lbs"}
                ref={weightInputRef}
              ></IonInput>
            </IonItem>
          </IonList>
          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />
          {calculatedBmi && <BmiResult result={calculatedBmi} />}
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
