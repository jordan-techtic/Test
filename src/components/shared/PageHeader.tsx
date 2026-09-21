type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-2">
      <h1 className="font-eb-garamond text-[30px] font-medium leading-[39.15px] text-foreground">{title}</h1>
      {description ? <p className="text-[16px] leading-[22px] text-muted-foreground">{description}</p> : null}
    </header>
  );
}
