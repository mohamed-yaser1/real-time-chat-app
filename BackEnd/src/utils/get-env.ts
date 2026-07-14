export const getEnv = (key: string, defaultValue:string ="" ) => {
  const val = process.env[key] ?? defaultValue;
  if (!val) throw new Error("Missing env variable: " + key+val);
  return val;
};