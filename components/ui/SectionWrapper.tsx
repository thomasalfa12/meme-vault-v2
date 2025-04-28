export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="py-20 px-4">{children}</section>;
}
