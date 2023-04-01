import Link from "next/link";
import Image from "next/image";
import varbasLogo from "../../assets/svg/logo.svg";
import homeIcon from "../../assets/svg/home.svg";
import taskIcon from "../../assets/svg/task.svg";
import userLogo from "../../assets/img/user.png";
import "../../styles/SideMenu.css";

const links = [
  { to: "/", icon: homeIcon },
  { to: "/about", icon: taskIcon },
];

// Logo component
function Logo() {
  return (
    <div id="logo">
      <Image src={varbasLogo} alt="Varbas Logo" />
    </div>
  );
}

// navigation component
function NavigationItem({ to, icon }) {
  return (
    <div className="nav-options-item">
      <Link href={to}>
        <Image
          src={icon}
        />
      </Link>
    </div>
  );
}

function Navigation() {
  return (
    <nav id="pages-options-menu" className="nav-options-container">
      <div className="nav-options-list">
        {links.map(({ to, icon }) => (
          <NavigationItem key={to} to={to} icon={icon} />
        ))}
      </div>
    </nav>
  );
}

// user component
function User() {
  return (
    <div className="user-menu">
      <div className="user-icon">
        <Image src={userLogo} alt="User Logo" />
      </div>
    </div>
  );
}

// SideMenu component
export default function SideMenu() {
  return (
    <aside>
      <Logo />
      <Navigation />
      <User />
    </aside>
  );
}
