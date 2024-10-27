export const generateDisplayNameFromEmail = (email?: string): string | null => {
  if (!email) return null;

  const [name] = email.split("@");
  return name;
};
