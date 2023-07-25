type SectionProps = {
  keys?: string[];
  title: string;
};

export default function Section({ keys, title }: SectionProps) {
  if (!keys || !keys.length) {
    return null;
  }

  return (
    <>
      ## {title}
      {'\n'}
      {keys.map((key) => `* "\`${key}\`"\n`)}
      {'\n'}
    </>
  );
}
