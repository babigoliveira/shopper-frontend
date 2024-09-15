import React, { useContext } from "react";

import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import { IStep } from "@/components/Stepper/Stepper";
import { Button, Input } from "@nextui-org/react";

interface InsertUsernameStepProps extends IStep {}

const InsertUsernameStep = ({
  onPrevStep,
  onNextStep,
}: InsertUsernameStepProps) => {
  const store = useContext(AppStoreContext);

  const { update, username } = useStore(store!);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("userName") as HTMLInputElement;
    update({ username: input.value });
    onNextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Seu nome de usuário"
        isClearable
        isRequired
        name="userName"
        defaultValue={username ?? ""}
      />
      <div className="mt-4 flex justify-between">
        <Button onClick={onPrevStep}>Voltar</Button>
        <Button type="submit" color="primary">
          Avançar
        </Button>
      </div>
    </form>
  );
};

export default InsertUsernameStep;
