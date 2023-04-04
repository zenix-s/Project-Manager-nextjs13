import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/svg/logonobg.svg";
import homeicon from "@/assets/svg/home.svg";
import tasksicon from "@/assets/svg/task.svg";
import "@/styles/asidebar.css";

const links = [
  {
    name: "Home",
    href: "/",
    icon: homeicon,
  },
  {
    name: "About",
    href: "/about",
    icon: tasksicon,
  },
  {
    name: "Proyectos",
    href: "/proyectos",
    icon: tasksicon,
  },
];

function NavItem({ name, href, icon }) {
  return (
    <div className="nav-item">
      <Link href={href}>
        <Image src={icon} alt={name} width={20} height={20} />
        <span>{name}</span>
      </Link>
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav-container">
      {links.map((link, index) => (
        <NavItem
          key={index}
          name={link.name}
          href={link.href}
          icon={link.icon}
        />
      ))}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <div className="logo-img">
        <Image src={logo} alt="Logo" width={50} height={50} />
      </div>
      <h1>Varbas</h1>
    </div>
  );
}

export default function AsideBar() {
  return (
    <aside>
      <div className="aside-container">
        <Logo />
        <Nav />
      </div>
    </aside>
  );
}
