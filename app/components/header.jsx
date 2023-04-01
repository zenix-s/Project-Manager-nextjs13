import Link from "next/link";

const links = [
  { to: '/', text: 'Home' },
  { to: '/about', text: 'About' },
];



export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          {links.map(({ to, text }) => (
            <li key={to}>
              <Link href={to}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}