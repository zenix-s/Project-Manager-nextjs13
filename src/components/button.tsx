import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: () => void;
  theme: "light" | "dark";
  trasparent?: boolean;
  icon?: IconType;
  shadow?: boolean;
  center?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  theme = "light",
  trasparent = false,
  icon: Icon,
  shadow = false,
  center = false,
}) => {
  const InnerButton = () => {
    if (Icon) {
      return (
        <div className="flex w-full items-center justify-start ">
          <Icon className="text-xl" />
          <span className="ml-2 text-xl">{label}</span>
        </div>
      );
    } else {
      return (
        <div className="flex w-full items-center justify-start ">
          <span className="text-xl">{label}</span>
        </div>
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
        p-4
        ${trasparent ? "hover:bg-white/20" : "hover:bg-neutral-700"}
        hover:text-white
      `}
      onClick={onClick}
    >
      <InnerButton />
    </button>
  );
};

export default Button;
