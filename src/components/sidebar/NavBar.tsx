
import LinkComponent from "@/components/link";
import { NavBarLinkProps } from "@/types";

const Nav = (
  { links }: { links: NavBarLinkProps[] },
) => {
  return (
    <nav className="flex flex-col gap-1.5 p-4">
      {links.map((link:any, index:any) => (
        <LinkComponent
          key={index}
          label={link.label}
          theme="transparent"
          textColor="white"
          hoverEffect="whiter"
          href={link.href}
          icon={link.icon}
          uppercase={true}
        />
      ))}
    </nav>
  );
};

export default Nav;