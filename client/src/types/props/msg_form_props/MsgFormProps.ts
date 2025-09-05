import type { IMsgAPIService } from "../../../api_services/msg/IMsgAPIService";

export type MsgFormProps = {
    msgApi: IMsgAPIService;
    otherUserId: number;
};