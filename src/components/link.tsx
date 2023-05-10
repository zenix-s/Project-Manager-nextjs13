import Link from "next/link";
import { IconType } from "react-icons";
interface LinkProps {
  label: string;
  onClick?: () => void;
  href?: string;
  theme: "primary" | "secondary" | "accent" | "ghost";
  icon?: IconType;
  center?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
  circle?: boolean;
  loading?: boolean;
  active?: boolean;
}
const LinkComponent: React.FC<LinkProps> = ({
  label,
  theme = "primary",
  icon: Icon,
  center = false,
  fullWidth = false,
  href="#",
  outline = false,
  circle = false,
  loading = false,
  active = false,
}) => {
  

  return (
    <Link
      href={href}
      className={`
        btn
        ${theme === "primary" && "btn-primary"}
        ${theme === "secondary" && "btn-secondary"}
        ${theme === "accent" && "btn-accent"}
        ${theme === "ghost" && "btn-ghost"}
        ${outline && "btn-outline"}
        ${fullWidth && "w-full"}
        ${circle && "btn-circle"}
        ${active && "active"}
        ${loading && "loading"}

    `}
    >
      <div
        className={`
        ${!center ? "justify-start" : ""}
        flex w-full items-center gap-4 
      `}
      >
        {Icon && <Icon />}
        {label}
      </div>
    </Link>
  );
};

export default LinkComponent;
