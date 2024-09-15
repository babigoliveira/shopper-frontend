import React, { useContext } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import CreateMeasure from "@/components/CreateMeasure/CreateMeasure";
import ScreenshotStep from "@/components/Steps/ScreenshotStep";
import ConfirmScreenshotStep from "@/components/Steps/ConfirmScreenshotStep";
import Stepper from "@/components/Stepper/Stepper";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";
import InsertUsernameStep from "@/components/Steps/InsertUsernameStep";
import ConfirmationStep from "@/components/Steps/ConfirmationStep";
import ConfirmMeasureStep from "@/components/Steps/ConfirmMeasureStep";
import { IoAddOutline } from "react-icons/io5";

export default function CreateMeasureModal() {
  const store = useContext(AppStoreContext);

  const { update } = useStore(store!);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFinish = async (closeModal: () => void) => {
    closeModal();
    update({ loading: false });
  };

  return (
    <>
      <Button
        isIconOnly
        variant="shadow"
        color="primary"
        onPress={onOpen}
        size="lg"
        className="fixed bottom-8 right-8 rounded-full"
      >
        <IoAddOutline className="text-3xl" />
      </Button>

      <Modal
        isDismissable={false}
        backdrop={"opaque"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">
                Registrar nova medição
              </ModalHeader>
              <ModalBody>
                <div className="mb-8">
                  <Stepper
                    onFinish={() => handleFinish(onClose)}
                    steps={[
                      CreateMeasure,
                      ScreenshotStep,
                      ConfirmScreenshotStep,
                      InsertUsernameStep,
                      ConfirmationStep,
                      ConfirmMeasureStep,
                    ]}
                  />
                </div>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
