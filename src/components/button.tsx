import { IconType } from "react-icons";
import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  theme = "light",
  hoverEffect = "none",
  textColor,
  icon: Icon,
  shadow = false,
  center = false,
  padding = true,
  uppercase = false,
  fullWidth = false,
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
    <button
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
      onClick={onClick}
    >
      <div
        className={`
        ${HoverEffect()}
        rounded-md
        ${padding ? "p-4" : "p-2"} 
        ${center ? "justify-center" : "justify-start"}
        flex w-full items-center gap-4 
      `}
      >
        <IconSec />
        <LabelSec />
      </div>
    </button>
  );
};

export default Button;
