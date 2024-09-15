import CreateMeasureModal from "@/components/CreateMeasureModal/CreateMeasureModal";
import Listing from "@/components/Listing/Listing";
import { Button, Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import React, { useState } from "react";
import shopperApi from "@/apis/shopperApi";
import { MeasureType } from "@/components/CreateMeasure/CreateMeasure";
import { toast } from "react-toastify";

interface Reading {
  measure_type: MeasureType;
  measure_datetime: string;
  measure_uuid: string;
  image_url: string;
  has_confirmed: boolean;
}

interface ListingResponse {
  customer_code: string;
  measures: [Reading];
}

export default function Home() {
  const [readings, setReadings] = useState<Reading[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMeasures = async (
    username: string,
    measureType: MeasureType | null,
  ) => {
    setLoading(true);

    try {
      const response = await shopperApi.get<ListingResponse>(
        `/${username}/list`,
        {
          params: {
            measure_type: measureType,
          },
        },
      );

      setReadings(response.data.measures);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const getInput = (name: string) =>
      form.elements.namedItem(name) as HTMLInputElement;

    const username = getInput("username").value;
    const water = getInput("water").checked;
    const gas = getInput("gas").checked;

    let measureType: MeasureType | null = null;

    if (!water && gas) {
      measureType = "GAS";
    } else if (water && !gas) {
      measureType = "WATER";
    }

    fetchMeasures(username, measureType).catch((error) => {
      if (error.status == 404) {
        toast.info("Nenhuma leitura encontrada");
      } else {
        toast.error("Falha ao carregar lista de leituras");
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

      {readings && <Listing measures={readings} />}
      <CreateMeasureModal />
    </div>
  );
}
