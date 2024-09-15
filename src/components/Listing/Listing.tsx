import React, { useContext } from "react";
import {
  MEASURE_TYPES,
  MeasureType,
} from "@/components/CreateMeasure/CreateMeasure";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import { format } from "date-fns";
import { MdClose, MdDone } from "react-icons/md";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";
import { AppStoreContext } from "@/appStoreContext";
import { useStore } from "zustand";

interface Reading {
  measure_type: MeasureType;
  measure_datetime: string;
  measure_uuid: string;
  image_url: string;
  has_confirmed: boolean;
}

const columns = [
  {
    key: "measure_type",
    label: "Tipo",
  },
  {
    key: "measure_datetime",
    label: "Data",
  },
  {
    key: "has_confirmed",
    label: "Confirmado?",
  },
  {
    key: "actions",
    label: "Ações",
  },
];

const renderCell = (reading: Reading, columnKey: string) => {
  const cellValue = reading[columnKey as keyof Reading];

  switch (columnKey) {
    case "measure_type":
      return MEASURE_TYPES.find(({ key }) => key === cellValue)?.label;
    case "measure_datetime":
      return format(cellValue as string, "dd/MM/yyyy HH:mm:ss");
    case "has_confirmed":
      return cellValue ? (
        <MdDone className="mx-auto text-xl text-success" />
      ) : (
        <MdClose className="mx-auto text-xl text-danger" />
      );
    case "image_url":
      return (
        <Link
          className="text-blue-400 underline-offset-4 hover:underline"
          target="_blank"
          href={cellValue as string}
        >
          {String(cellValue).replace(
            "https://generativelanguage.googleapis.com/v1beta/files/",
            "",
          )}
        </Link>
      );
    case "measure_uuid":
      return <span className="font-mono">{cellValue}</span>;
    case "actions":
      return (
        <Popover
          showArrow
          backdrop="opaque"
          placement="right"
          classNames={{
            base: [
              // arrow color
              "before:bg-default-200",
            ],
            content: [
              "py-3 px-4 border border-default-200",
              "bg-gradient-to-br from-white to-default-300",
              "dark:from-default-100 dark:to-default-50",
            ],
          }}
        >
          <PopoverTrigger>
            <Button size="sm" isIconOnly>
              <HiDotsVertical className="text-xl" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {() => {
              return (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="bordered"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(reading.image_url)
                        .then(() => toast.info("Link da imagem copiado"));
                    }}
                  >
                    Copiar link imagem
                  </Button>

                  <Button
                    variant="bordered"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(reading.measure_uuid)
                        .then(() => toast.info("ID da leitura copiado"));
                    }}
                  >
                    Copiar ID da leitura
                  </Button>
                </div>
              );
            }}
          </PopoverContent>
        </Popover>
      );
    default:
      return cellValue;
  }
};

const Listing = () => {
  const store = useContext(AppStoreContext);

  const { filteredMeasures } = useStore(store!);

  if (!filteredMeasures) {
    return null;
  }

  return (
    <Table isStriped aria-label="Listagem de leituras">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={filteredMeasures ?? []}>
        {(item) => (
          <TableRow key={item.measure_uuid}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof Reading)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Listing;
