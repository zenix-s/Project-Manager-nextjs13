import Link from "next/link";
import { IconType } from "react-icons";
import { ButtonProps } from "@/types";

const LinkComponent: React.FC<ButtonProps> = ({
  label,
  theme = "light",
  hoverEffect = "none",
  textColor,
  icon: Icon,
  shadow = false,
  center = false,
  padding = true,
  uppercase = false,
  fullWidth = false,
  href="#",
}) => {
  const IconColor = () => {
    switch (textColor) {
      case "black":
        return "black";
      case "white":
        return "white";
    }
  };

  const FontColor = () => {
    switch (textColor) {
      case "white":
        return "text-white";
      case "black":
        return "text-black";
    }
  };

  const BackColor = () => {
    switch (theme) {
      case "light":
        return "bg-gray-100";
      case "dark":
        return "bg-neutral-800";
      case "transparent":
        return "bg-transparent";
    }
  };

  const HoverEffect = () => {
    switch (hoverEffect) {
      case "whiter":
        return "hover:bg-white/25";
      case "darker":
        return "hover:bg-black/25";
      case "none":
        return "";
    }
  };

  const IconSec = () => {
    return Icon ? <Icon color={IconColor()} /> : null;
  };

  const LabelSec = () => {
    return label !== "" ? <span>{label}</span> : null;
  };

  return (
    <Link
      href={href}
      className={`
      ${BackColor()}
      ${FontColor()}
      ${shadow ? "shadow-xl" : ""}
      ${uppercase ? "uppercase" : ""}
      ${fullWidth ? "w-full" : ""}
      text-md
      font-light
      tracking-wide
      rounded-md
    `}
    >
      <div
        className={`
        ${HoverEffect()}
        rounded-md
        ${padding ? "p-4" : "p-1"} 
        ${center ? "justify-center" : "justify-start"}
        flex w-full items-center gap-4 
      `}
      >
        {IconSec()}
        {LabelSec()}
      </div>
    </Link>
  );
};

export default LinkComponent;
