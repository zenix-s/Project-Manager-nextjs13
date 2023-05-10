'use client'
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
          theme="ghost"
          href={link.href}
          icon={link.icon}
        />
      ))}
    </nav>
  );
};

export default Nav;