import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { FormEventHandler, useContext } from "react";
import { IStep } from "@/components/Stepper/Stepper";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";

export const MEASURE_TYPES = [
  {
    key: "WATER",
    label: "Água",
  },
  {
    key: "GAS",
    label: "Gás",
  },
] as const;

export type MeasureType = (typeof MEASURE_TYPES)[number]["key"];

export interface CreateMeasureFormProps extends IStep {}

const CreateMeasureForm = ({ onNextStep }: CreateMeasureFormProps) => {
  const store = useContext(AppStoreContext);

  const { update, measureType } = useStore(store!);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("measureType") as HTMLInputElement;
    update({ measureType: input.value as MeasureType });
    onNextStep();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex justify-between">
      <RadioGroup
        defaultValue={measureType}
        label="O que deseja medir?"
        isRequired
        name="measureType"
        orientation="horizontal"
      >
        <Radio value="WATER">Água</Radio>
        <Radio value="GAS">Gás</Radio>
      </RadioGroup>

      <Button className="self-center" type="submit" color="primary">
        Avançar
      </Button>
    </form>
  );
};

export default CreateMeasureForm;
