import React, { useContext } from "react";

import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import { IStep } from "@/components/Stepper/Stepper";
import { Button } from "@nextui-org/react";
import { MEASURE_TYPES } from "@/components/CreateMeasure/CreateMeasure";
import Image from "next/image";
import cn from "@/cn";
import useBreakpoints from "@/hooks/useBreakpoint";
import shopperApi from "@/apis/shopperApi";
import { toast } from "react-toastify";

interface ConfirmationStepProps extends IStep {}

interface RowProps {
  children: React.ReactNode;
  className?: string;
}

const Justify = ({ children, className }: RowProps) => (
  <div className={cn("flex justify-between", className)}>{children}</div>
);

const ConfirmationStep = ({
  onPrevStep,
  onNextStep,
}: ConfirmationStepProps) => {
  const { md: isMediumScreen } = useBreakpoints();

  const store = useContext(AppStoreContext);

  const { measureType, measurePicture, username, update } = useStore(store!);
  const loading = useStore(store!, (s) => s.loading);

  const selectedMeasureType = MEASURE_TYPES.find(
    ({ key }) => key === measureType!,
  )?.label;

  const handleNextButtonClick = async () => {
    update({ loading: true });

    try {
      const response = await shopperApi.post("/upload", {
        customer_code: username,
        measure_datetime: new Date().toISOString(),
        measure_type: measureType,
        image: measurePicture,
      });

      const { measure_value, measure_uuid } = response.data;
      update({ measureValue: measure_value, measureUuid: measure_uuid });

      onNextStep();
    } catch (error: any) {
      if (error.status === 409) {
        toast.error("Essa leitura já foi realizada");
      } else {
        toast.error("Falha ao registrar leitura");
      }
    } finally {
      update({ loading: false });
    }
  };

  const imageHeight = isMediumScreen ? 300 : 400;

  return (
    <div>
      <p className="mb-4 text-xl">Confirme seus dados</p>
      <dl className="flex flex-col gap-1">
        <Justify>
          <dt>Tipo de medição</dt>
          <dd>{selectedMeasureType}</dd>
        </Justify>
        <Justify>
          <dt>Nome de usuário</dt>
          <dd>{username}</dd>
        </Justify>
        <div>
          <dd className="mt-2">
            <Image
              className="mx-auto rounded border border-red-500"
              width={(imageHeight * 3) / 4}
              height={imageHeight}
              src={measurePicture!}
              alt="Foto do leitor"
            />
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex justify-between">
        <Button onClick={onPrevStep}>Voltar</Button>
        <Button
          onClick={handleNextButtonClick}
          color="primary"
          isLoading={loading}
        >
          Analisar leitura
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
