'use client'
import LinkComponent from "@/components/link";
import { NavBarLinkProps } from "@/types";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav = (
  { links }: { links: NavBarLinkProps[] },
) => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1.5 p-2">
      {links.map((link:any, index:any) => (
        <div
          key={index}
          className="tooltip tooltip-right"
          data-tip={link.label}
        >
          {/* <LinkComponent
            key={index}
            label=""
            theme="ghost"
            href={link.href}
            icon={link.icon}
            fontSize="lg"
            active={pathname === link.href}
          /> */}
          <Link 
            href={link.href}
            className="tooltip tooltip-right btn btn-ghost items-center justify-center flex text-lg"
            data-tip={link.label}
          >
            <link.icon />
            <span className="block sm:hidden">
              {link.label}
            </span>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Nav;