export type ButtonVariant =
  | "primary"
  | "destructive"
  | "outline"
  | "outline-blue"
  | "outline-white"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonType = {
  button_text?: string;
  button_variant?: ButtonVariant;
  button_url: string;
};
