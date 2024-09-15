import React, { useContext } from "react";

import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import { IStep } from "@/components/Stepper/Stepper";
import { Button, Input } from "@nextui-org/react";
import shopperApi from "@/apis/shopperApi";
import { toast } from "react-toastify";
import Image from "next/image";
import useBreakpoints from "@/hooks/useBreakpoint";

interface ConfirmMeasureStepProps extends IStep {}

const ConfirmMeasureStep = ({
  onPrevStep,
  onNextStep,
}: ConfirmMeasureStepProps) => {
  const { md: isMediumScreen } = useBreakpoints();

  const store = useContext(AppStoreContext);

  const { update, measurePicture, measureValue, measureUuid } = useStore(
    store!,
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem("measureValue") as HTMLInputElement;
    const measureValue = +input.value;

    try {
      await shopperApi.patch("/confirm", {
        measure_uuid: measureUuid,
        confirmed_value: measureValue,
      });

      toast.success("Leitura confirmada");
      onNextStep();
    } catch (error) {
      toast.error("Falha ao registrar leitura");
    } finally {
      update({ loading: false });
    }
  };

  const imageHeight = isMediumScreen ? 500 : 600;

  return (
    <form onSubmit={handleSubmit}>
      <Image
        className="mx-auto mb-4 rounded border border-red-500"
        width={(imageHeight * 3) / 4}
        height={imageHeight}
        src={measurePicture!}
        alt="Foto do leitor"
      />

      <Input
        defaultValue={measureValue!.toString()}
        type="number"
        label="Confirme a leitura"
        isClearable
        isRequired
        name="measureValue"
      />

      <div className="mt-4 flex justify-between">
        <Button onClick={onPrevStep}>Voltar</Button>
        <Button type="submit" color="primary">
          Concluir
        </Button>
      </div>
    </form>
  );
};

export default ConfirmMeasureStep;
