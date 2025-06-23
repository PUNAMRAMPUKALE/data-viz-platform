import React from "react";
import box from "../assets/homeframe.png";
import homeIcon from "../assets/home.png";
import burgerIcon from "../assets/hamburger.png";
import bellIcon from "../assets/bell.png";
import textclockIcon from "../assets/clipboard-text-clock.png";
import cloudIcon from "../assets/cloud-upload.png";
import cogIcon from "../assets/cog.png";
import accountCircle from "../assets/account-circle.png";

import { useAuth } from "../hooks/useAuth";
import { UserCircle } from "lucide-react";

// Top icons (excluding last one)
const icons = [
  { icon: burgerIcon, alt: "burger" },
  { icon: homeIcon, alt: "home", overlay: true },
  { icon: bellIcon, alt: "bell" },
  { icon: textclockIcon, alt: "clipboard" },
  { icon: cloudIcon, alt: "upload" },
  { icon: cogIcon, alt: "settings" },
];

// Bottom icon (e.g., profile/account)
const bottomIcon = { icon: accountCircle, alt: "account" };

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <aside
      className="w-16 h-full flex flex-col justify-between items-center py-4"
      style={{ backgroundColor: "#0E0D0D" }}
    >
      {/* Top Icons */}
      <div className="flex flex-col items-center space-y-6">
        {icons.map(({ icon, alt, overlay }, index) =>
          overlay ? (
            <div key={index} className="relative w-[40px] h-[40px]">
              <img
                src={box}
                alt="background-box"
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
              <img
                src={icon}
                alt={alt}
                className="absolute top-1/2 left-1/2 w-[24px] h-[24px] transform -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
          ) : (
            <img
              key={index}
              src={icon}
              alt={alt}
              className="w-[24px] h-[24px] object-contain"
            />
          )
        )}
      </div>

      {/* Bottom Icon */}
      <div>
        <img
          src={bottomIcon.icon}
          alt={bottomIcon.alt}
          className="w-[24px] h-[24px] object-contain"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
