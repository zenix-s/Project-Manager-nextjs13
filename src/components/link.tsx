import Link from "next/link";
import { IconType } from "react-icons";

interface LinkProps {
  label: string;
  href: string;
  theme: "light" | "dark";
  fontColor?: "white" | "black";
  icon?: IconType;
  shadow?: boolean;
  center?: boolean;
  padding?: boolean;
  trasparent?: boolean;
  uppercase?: boolean;
  fullWidth?: boolean;
}

const LinkComponent: React.FC<LinkProps> = ({
  label,
  href,
  theme = "light",
  trasparent = false,
  icon: Icon,
  shadow = false,
  center = false,
  padding = true,
  uppercase = false,
  fullWidth = false,
}) => {
  const InnerLink = () => {
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
          <span className="text-xl">{label}</span>
        </>
      );
    }
  };

  return (
    <Link
      href={href}
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
    >
      <div
        className={`
        flex w-full items-center
        ${center ? "justify-center" : "justify-start"}
      `}
      >
        <InnerLink />
      </div>
    </Link>
  );
};

export default LinkComponent;
