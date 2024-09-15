import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import Image from "next/image";

interface ConfirmScreenshotProps {
  onConfirm: () => void;
  onRetry: () => void;
}

const ConfirmScreenshot = ({ onConfirm, onRetry }: ConfirmScreenshotProps) => {
  const store = useContext(AppStoreContext);

  const { measurePicture } = useStore(store!);

  return (
    <div>
      <p className="mb-4">A imagem está OK?</p>
      <div className="flex justify-center">
        <Image
          width={400}
          height={(400 * 3) / 4}
          src={measurePicture!}
          alt="Imagem da leitura"
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onRetry}>Voltar</Button>
        <Button color="primary" onClick={onConfirm}>
          Avançar
        </Button>
      </div>
    </div>
  );
};

export default ConfirmScreenshot;
