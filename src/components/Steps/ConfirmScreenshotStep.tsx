import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import Image from "next/image";
import { IStep } from "@/components/Stepper/Stepper";

interface ConfirmScreenshotStepProps extends IStep {}

const ConfirmScreenshotStep = ({
  onNextStep,
  onPrevStep,
}: ConfirmScreenshotStepProps) => {
  const store = useContext(AppStoreContext);

  const { measurePicture } = useStore(store!);

  return (
    <div>
      <p className="mb-4">A imagem está OK?</p>
      <div className="flex justify-center">
        <Image
          className="rounded border border-red-500"
          width={400}
          height={(400 * 3) / 4}
          src={measurePicture!}
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

export default ConfirmScreenshotStep;
