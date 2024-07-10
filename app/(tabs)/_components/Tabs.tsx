"use client";

import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  NewspaperIcon as NewspaperIconSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
  NewspaperIcon as NewspaperIconOutline,
} from "@heroicons/react/24/outline";
import TabsIcon from "./TabsIcon";

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
          On={NewspaperIconSolid}
          Off={NewspaperIconOutline}
          label="뉴스"
          link="/news"
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
