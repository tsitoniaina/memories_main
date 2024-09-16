import { SignUpSchema } from "@/validators/signup.schema.ts";

export type ValidationError = {
  title: string;
  propertyPath: keyof SignUpSchema;
};
export type SettingPasswordPayloadsType = {
  hash: string;
  password: string;
  repeatPassword: string;
};
export type ErrorType = Record<"message", string | null>;

export type RecoverPasswordStateType = ErrorType | null;
export type CreateUserStateType = ValidationError[] | void;

export const sortOptions = {
  today: "today",
  this_week: "this week",
} as const;
export const filterOption = [
  {
    value: sortOptions.today,
    label: "Today",
  },
  {
    value: sortOptions.this_week,
    label: "This week",
  },
];
export type sortType = keyof typeof sortOptions;
