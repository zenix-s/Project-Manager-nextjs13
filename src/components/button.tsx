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
}) => {
  const InnerButton = () => {
    if (Icon) {
      return (
        <>
          <Icon className="" />
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
        ${theme === "light" ? "bg-neutral-800" : "bg-gray-100"}
        ${trasparent ? "bg-transparent" : ""}
        ${theme === "light" ? "text-white" : "text-black"}
        ${shadow ? "shadow-lg" : ""}
        rounded-md
        ${padding ? "p-4" : ""}
        ${trasparent ? "hover:bg-white/20" : "hover:bg-neutral-700"}
        hover:text-white
        ${uppercase ? "uppercase" : ""}
        font-thin
        tracking-wide
        text-xl
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
