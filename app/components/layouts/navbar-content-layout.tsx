interface Props {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const NavbarContentLayout = ({ title, children, subtitle }: Props) => {
  return (
    <div className="container mt-4">
      <div className="flex flex-col mb-6">
        <div className="text-2xl text-foreground font-semibold">{title}</div>
        <div className="text-muted-foreground text-sm">{subtitle}</div>
      </div>
      {children}
    </div>
  );
};
