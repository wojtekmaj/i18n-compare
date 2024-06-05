export default function parse(str?: string): Record<string, string> | null {
  if (!str) {
    return null;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    console.error(error);
    return null;
  }
}
