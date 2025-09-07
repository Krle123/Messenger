import type { UnreadDto } from "../../models/msg/UnreadDto";

export type UnreadResponse = {
  success: boolean;
  message: string;
  data?: UnreadDto[];
}