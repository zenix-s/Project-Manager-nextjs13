"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RouteProps {
  name: string;
  path: string;
  actual: boolean;
}

const BreadCrumbItem = (ruta: RouteProps) => {
  if (ruta.actual) {
    return (
      <>
        <span className="text-neutral-600 cursor-default"> / {ruta.name}</span>
      </>
    );
  } else {
    return (
      <>
        <span> / </span>
        <Link href={ruta.path} className="hover:text-cyan-500">
          <span>{ruta.name}</span>
        </Link>
      </>
    );
  }
};

const BreadCrumbs = () => {
  const actualRoute = () => {
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

  const actualRouteArray = actualRoute();

  return (
    <div>
      {actualRouteArray?.map((ruta, index) => (
        <BreadCrumbItem key={index} {...ruta} />
      ))}
    </div>
  );
};

export default BreadCrumbs;
