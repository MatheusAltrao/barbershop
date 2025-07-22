interface TitleSectionProps {
  title: string;
}

export default function TitleSection({ title }: TitleSectionProps) {
  return (
    <h3 className="uppercase text-muted-foreground text-xs font-medium mb-3">
      {title}
    </h3>
  );
}
