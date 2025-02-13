// validators
export const required = (value: string) => {
  if (value) return true;
  return "This field is required";
};
export const maxLength = (max: number) => {
  return (value: string) => {
    if (value.length <= max) return true;
    return `Exceed maximum length of ${max} characters`;
  };
};
