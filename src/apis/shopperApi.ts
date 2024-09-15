import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "^/env";
import { MeasureType } from "@/components/CreateMeasure/CreateMeasure";

export interface RegisterMeasureRequestDto {
  customerCode: string;
  measureType: MeasureType;
  image: string;
}

export interface Reading {
  measure_type: MeasureType;
  measure_datetime: string;
  measure_uuid: string;
  image_url: string;
  has_confirmed: boolean;
}

export interface ListingResponse {
  customer_code: string;
  measures: [Reading];
}

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const registerMeasure = ({
  customerCode,
  measureType,
  image,
}: RegisterMeasureRequestDto) =>
  api.post("/upload", {
    customer_code: customerCode,
    measure_datetime: new Date().toISOString(),
    measure_type: measureType,
    image,
  });

export const confirmMeasure = (measureUuid: string, measure: number) =>
  api.patch("/confirm", {
    measure_uuid: measureUuid,
    confirmed_value: measure,
  });

export const filterMeasures = (username: string, measureType: string | null) =>
  api.get<ListingResponse>(`/${username}/list`, {
    params: {
      measure_type: measureType,
    },
  });

export default api;
