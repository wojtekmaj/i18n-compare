export default function parse(str?: string): Record<string, string> | null {
  if (!str) {
    return null;
  }

  try {
    return JSON.parse(str);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
