export type AdminNotificationType =
  | "booking-created"
  | "booking-cancelled"
  | "booking-rescheduled"
  | "reminder-sent"
  | "status-updated"
  | "export-completed"
  | "login"
  | "logout";

export type AdminNotification = {
  id: string;
  type: AdminNotificationType;
  message: string;
  createdAt: number;
  read: boolean;
  status?: string;
};

export function pushNotification(
  notifications: AdminNotification[],
  type: AdminNotificationType,
  message: string,
  status?: string,
) {
  const notification: AdminNotification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    message,
    createdAt: Date.now(),
    read: false,
    status,
  };

  return [notification, ...notifications].slice(0, 30);
}
