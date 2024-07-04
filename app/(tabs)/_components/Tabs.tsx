"use client";

import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";
import { HomeIcon as HomeIconOutline } from "@heroicons/react/24/outline";
import TabsIcon from "./TabsIcon";
import { UserIcon as UserIconSolid } from "@heroicons/react/20/solid";
import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";

const Tabs = () => {
  return (
    <>
      <div className="absolute bottom-0 inset-x-0 max-w-lg h-[60px] border-t border-white bg-primary flex items-center justify-around rounded-b-xl">
        <TabsIcon
          On={HomeIconSolid}
          Off={HomeIconOutline}
          label="홈"
          link="/summary"
        />
        <TabsIcon
          On={UserIconSolid}
          Off={UserIconOutline}
          label="마이"
          link="/summary/profile"
        />
      </div>
    </>
  );
};

export default Tabs;
