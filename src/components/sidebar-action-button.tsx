'use client';
import { IconType } from "react-icons";

interface sidebaractionbuttonProps {
  icon: IconType;
  onClick: () => void;
}

const SidebarActionButton: React.FC<sidebaractionbuttonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button className="sidebar-action-button" onClick={onClick}>
      {Icon && 
        <Icon
          size={30}
          color="#fff"
        />
      }
    </button>
  );
};

export default SidebarActionButton;