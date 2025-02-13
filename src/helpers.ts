// validators
export const required = (value: string) => {
  if (value) return true;
  return "Please add a task content";
};
export const maxLength = (max: number) => {
  return (value: string) => {
    if (value.length <= max) return true;
    return `"Exceed maximum length of ${max} characters"`;
  };
};
