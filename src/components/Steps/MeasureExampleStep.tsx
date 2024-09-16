import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import Image from "next/image";
import { IStep } from "@/components/Stepper/Stepper";

import hidrometro from "@/assets/hidrometro.png";
import manometro from "@/assets/manometro.png";
import useBreakpoints from "@/hooks/useBreakpoint";

interface MeasureExampleStepProps extends IStep {}

const MeasureExampleStep = ({
  onNextStep,
  onPrevStep,
}: MeasureExampleStepProps) => {
  const { md: isMediumScreen } = useBreakpoints();

  const store = useContext(AppStoreContext);

  const { measureType } = useStore(store!);

  const exampleFigure = measureType === "WATER" ? manometro : hidrometro;

  const imageHeight = isMediumScreen ? 600 : 400;

  return (
    <div>
      <p className="mb-4">Exemplo de medidor</p>
      <div className="flex justify-center">
        <Image
          className="rounded border border-gray-500"
          width={(imageHeight * 3) / 4}
          height={imageHeight}
          src={exampleFigure!}
          alt="Imagem da leitura"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={onPrevStep}>Voltar</Button>
        <Button color="primary" onClick={onNextStep}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default MeasureExampleStep;
