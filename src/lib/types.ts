export type Status = "Operational" | "Degraded" | "Outage" | "Maintenance";

export type Banner = {
  id: string; title: string; message: string;
  startAt: string; endAt?: string | null;
  campuses: string[]; active: boolean;
};

export type Incident = {
  id: string; service: string; status: Status; title: string;
  note?: string; at: string;
};

export type Service = {
  id: string; name: string; owner?: string; status: Status;
  dependencies: string[]; incidentsOpen: number;
};

export type AuditLog = {
  id: string; ts: string; who: string; what: string;
};
