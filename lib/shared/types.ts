export interface FeedbackCreateInput {
  name: string;
  contact: string;
  message: string;
}

export interface FeedbackDTO {
  id: number;
  name: string;
  contact: string;
  message: string;
  createdAt: number;
  /** 服务端格式化的展示时间，仅用于后台展示。 */
  date: string;
  isRead: boolean;
}

export type AdminErrorStatus = 400 | 401 | 403;

export type AdminResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: AdminErrorStatus; error: string };

export interface LoginState {
  error?: string;
}
