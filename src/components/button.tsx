import { type } from "os";
import { IconType } from "react-icons";
interface ButtonProps {
  label?: string;
  onClick?: () => void;
  theme: "primary" | "secondary" | "accent" | "ghost" | "error";
  icon?: IconType;
  center?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
  circle?: boolean;
  loading?: boolean;
  active?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  theme = "primary",
  icon: Icon,
  type = "button",
  center = false,
  fullWidth = false,
  outline = false,
  circle = false,
  loading = false,
  active = false,
  disabled = false,
}) => {



  

  return (
    <button
      className={`
        btn
        ${theme === "primary" && "btn-primary"}
        ${theme === "secondary" && "btn-secondary"}
        ${theme === "accent" && "btn-accent"}
        ${theme === "ghost" && "btn-ghost"}
        ${theme === "error" && "btn-error"}
        ${outline && "btn-outline"}
        ${fullWidth && "w-full"}
        ${circle && "btn-circle"}
        ${active && "active"}
        ${loading && "loading"}
      `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <div
        className={`
        ${center ? "justify-center" : "justify-start"}
        flex w-full items-center gap-4 
      `}
      >
        {Icon && <Icon />}
        {label && label}
      </div>
    </button>
  );
};

export default Button;
