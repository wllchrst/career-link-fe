interface Props {
  children: React.ReactNode;
  title?: string;
}

export const NavbarContentLayout = ({ title, children }: Props) => {
  return (
    <div className="container mt-4">
      <div className="text-2xl text-primary font-bold mb-6">{title}</div>
      {children}
    </div>
  );
};
