"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsIconProps {
  On: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  Off: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  link: string;
}

const TabsIcon = ({ On, Off, label, link }: TabsIconProps) => {
  const pathname = usePathname();

  return (
    <Link href={link} className="flex flex-col gap-1 items-center py-2 w-full">
      {pathname === link ? (
        <On className="size-[25px]" />
      ) : (
        <Off className="size-[25px]" />
      )}
      <span className="text-[12px] text-white">{label}</span>
    </Link>
  );
};

export default TabsIcon;
