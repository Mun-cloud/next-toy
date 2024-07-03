import Tabs from "./_components/Tabs";

const TabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Tabs />
    </>
  );
};

export default TabsLayout;
