import { Button, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React, { useContext } from "react";
import { filterMeasures } from "@/apis/shopperApi";
import { MeasureType } from "@/components/CreateMeasure/CreateMeasure";
import { toast } from "react-toastify";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";

export default function FilterForm() {
  const store = useContext(AppStoreContext);

  const { update, loading } = useStore(store!);

  const fetchMeasures = async (
    username: string,
    measureType: MeasureType | null,
  ) => {
    update({ loading: true });

    try {
      const response = await filterMeasures(username, measureType);
      update({ filteredMeasures: response.data.measures });
    } finally {
      update({ loading: false });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const getInput = (name: string) =>
      form.elements.namedItem(name) as HTMLInputElement;

    const username = getInput("username").value.trim();
    const water = getInput("water").checked;
    const gas = getInput("gas").checked;

    let measureType: MeasureType | null = null;

    if (gas && !water) {
      measureType = "GAS";
    } else if (water && !gas) {
      measureType = "WATER";
    }

    fetchMeasures(username, measureType).catch((error) => {
      if (error.status == 404) {
        toast.info("Nenhuma leitura encontrada");
      } else {
        toast.error("Falha ao filtrar leituras");
      }
    });
  };

  return (
    <div>
      <div className="mb-8 mt-8 flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Filtrar leituras
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex content-between items-center gap-4">
            <Input
              isRequired
              isClearable
              name="username"
              label="Nome do usuário"
            />
            <CheckboxGroup
              name="measureType"
              className="flex-row flex-nowrap gap-32"
              orientation="horizontal"
              color="primary"
              defaultValue={["WATER", "GAS"]}
            >
              <Checkbox name="water" value="WATER">
                Água
              </Checkbox>
              <Checkbox name="gas" value="GAS">
                Gás
              </Checkbox>
            </CheckboxGroup>
          </div>
          <Button isLoading={loading} color="primary" type="submit">
            Filtrar
          </Button>
        </form>
      </div>
    </div>
  );
}
