import type { MessageDto } from "../../models/msg/MessageDto";

export type MsgResponse = {
  success: boolean;
  message: string;
  data?: MessageDto[];
}