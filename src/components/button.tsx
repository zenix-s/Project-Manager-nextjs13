import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: () => void;
  theme: "light" | "dark";
  trasparent?: boolean;
  icon?: IconType;
  shadow?: boolean;
  center?: boolean;
  padding?: boolean;
  uppercase?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  theme = "light",
  trasparent = false,
  icon: Icon,
  shadow = false,
  center = false,
  padding = true,
  uppercase = false,
  fullWidth = false,
}) => {
  const InnerButton = () => {
    const color = theme === "light" ? "black" : "white";

    if (Icon && label === "") {
      return (
        <>
          <Icon className="" color={color} />
        </>
      );
    } else if (Icon) {
      return (
        <>
          <Icon className="" color={color} />
          <span className="ml-4">{label}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="">{label}</span>
        </>
      );
    }
  };

  return (
    <button
      className={`
      ${theme === "light" ? "bg-gray-100" : "bg-neutral-800"}
      ${theme === "light" && !trasparent ? "hover:bg-gray-200" : ""}
      ${theme === "dark" && !trasparent ? "hover:bg-neutral-900" : ""}

      ${theme === "light" ? "text-black" : "text-white"}
      ${trasparent ? "bg-transparent" : ""}
      ${trasparent && theme === "light" ? "hover:bg-white/20" : ""}
      ${trasparent && theme === "dark" ? "hover:bg-black/20" : ""}
      ${shadow ? "shadow-lg" : ""}
      rounded-md
      ${padding ? "p-4" : ""}
      ${uppercase ? "uppercase" : ""}
      text-xl
      font-light
      tracking-wide
      ${fullWidth ? "w-full" : ""}
      `}
      onClick={onClick}
    >
      <div
        className={`flex w-full items-center 
        ${center ? "justify-center" : "justify-start"}`}
      >
        <InnerButton />
      </div>
    </button>
  );
};

export default Button;
