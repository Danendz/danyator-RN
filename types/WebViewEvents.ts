import {Log, LogTypes} from "@/types/Log";

export type EventsTypes = LogTypes | 'title'

export interface EventTitle {
  type: 'title'
  value: string
}

export type Events = Log | EventTitle