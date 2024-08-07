import Tabs from "./_components/Tabs";

const TabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">{children}</div>
      <Tabs />
    </>
  );
};

export default TabsLayout;
