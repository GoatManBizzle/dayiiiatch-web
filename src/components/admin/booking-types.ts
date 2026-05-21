export type Booking = {
  id: string;
  service: string;
  service_label: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string | null;
  details?: string | null;
  status: string;
};
