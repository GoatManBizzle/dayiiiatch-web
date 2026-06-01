export type Booking = {
  id: string;
  client_id?: string | null;
  service: string;
  service_label: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string | null;
  details?: string | null;
  status: string;
  client?: {
    id: string;
    name: string;
    company?: string | null;
    email: string;
    status: string;
    portal_enabled: boolean;
  } | null;
};
