'use client'
import LinkComponent from "@/components/link";
import { NavBarLinkProps } from "@/types";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Nav = (
  { links }: { links: NavBarLinkProps[] },
) => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1.5 p-4">
      {links.map((link:any, index:any) => (
        <LinkComponent
          key={index}
          label={link.label}
          theme="ghost"
          href={link.href}
          icon={link.icon}
          fontSize="lg"
          active={pathname === link.href}
        />
      ))}
    </nav>
  );
};

export default Nav;