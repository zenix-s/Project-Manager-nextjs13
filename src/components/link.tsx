import Link from "next/link";
import { IconType } from "react-icons";

interface LinkProps {
  label: string;
  href: string;
  theme: "light" | "dark";
  icon?: IconType;
  shadow?: boolean;
  center?: boolean;
  padding?: boolean;
  trasparent?: boolean;
  uppercase?: boolean;
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
    <Link href={href} className={`
      ${theme === "light" ? "bg-neutral-800" : "bg-gray-100"}
      ${trasparent ? "bg-transparent" : ""}
      ${theme === "light" ? "text-white" : "text-black"}
      ${shadow ? "shadow-lg" : ""}
      rounded-md
      ${padding ? "p-4" : ""}
      ${trasparent ? "hover:bg-white/20" : "hover:bg-neutral-700"}
      hover:text-white
      font-thin
      tracking-wide
      text-xl
      ${uppercase ? "uppercase" : ""}
    `}>
      <div className={`
        flex w-full items-center
        ${center ? "justify-center" : "justify-start"}
      `}>
        <InnerLink />
      </div>
    </Link>
  );
};

export default LinkComponent;