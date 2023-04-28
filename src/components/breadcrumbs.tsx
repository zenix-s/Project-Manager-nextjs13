"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkComponent from "./link";

interface RouteProps {
  name: string;
  path: string;
  actual: boolean;
}

const BreadCrumbItem = (ruta: RouteProps) => {
  if (ruta.actual) {
    return (
      <>
        <span className="cursor-default capitalize text-gray-300">
          {" "}
          / {ruta.name}
        </span>
      </>
    );
  } else {
    return (
      <>
        <span> / </span>
        <Link href={ruta.path} className=" capitalize hover:text-cyan-500">
          <span>{ruta.name}</span>
        </Link>
      </>
    );
  }
};

const BreadCrumbs = () => {
  const useActualRoute = () => {
    const pathname = usePathname();
    const pathArray = pathname?.split("/");

    const actualRoute = pathArray?.map((path, index) => {
      if (index === 0) return { name: "Dashboard", path: "/", actual: false };
      if (index === pathArray.length - 1)
        return {
          name: path,
          path: pathArray[index - 1] + "/" + path,
          actual: true,
        };
      return {
        name: path,
        path: pathArray[index - 1] + "/" + path,
        actual: false,
      };
    });

    return actualRoute;
  };

  const actualRouteArray = useActualRoute();

  return (
    <div className="text-neutral-100">
      {actualRouteArray?.map((ruta, index) => (
        <BreadCrumbItem key={index} {...ruta} />
      ))}
    </div>
  );
};

export default BreadCrumbs;
