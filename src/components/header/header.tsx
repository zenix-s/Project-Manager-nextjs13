'use client'
import { SlMenu } from "react-icons/sl";
import BreadCrumbs from "../breadcrumbs";
import Button from "../button";
import useAside from "@/hooks/useAside";
const Header = () => {

  
  const aside = useAside();

  return (
    <div className="flex justify-between">
      <BreadCrumbs />
      <div className="flex sm:hidden">
        <Button
          theme="ghost"
          icon={SlMenu}
          onClick={() => {
            aside.onOpen();
          }}
        />
      </div>
    </div>
  );
};

export default Header;
