import { IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

const BmiControls: React.FC<{
  onCalculate: () => void;
  onReset: () => void;
}> = (props) => {
  return (
    <div className="ion-text-center ion-margin">
      <IonButton onClick={props.onCalculate}>
        <IonIcon slot="start" icon={calculatorOutline} />
        Calculate
      </IonButton>
      <IonButton onClick={props.onReset} fill="outline">
        <IonIcon slot="start" icon={refreshOutline} />
        Reset
      </IonButton>
    </div>
  );
};

export default BmiControls;
