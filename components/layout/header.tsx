import Link from "next/link";

import classes from './header.module.css';

const Header: React.FC = () => (
  <header className={classes.header}>
    <div className={classes.logo}>
      <Link href="/">Next Events</Link>
    </div>
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link href="/events">Browse All Events</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;