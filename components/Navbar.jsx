// Navbar.js

import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navbarLinks}>
          <Link href="/admin">
            CCTV
            </Link>

           <Link href="/map">
            MAP
            </Link>

            <Link href="/dashboard">
            DASHBOARD
            </Link>

        </ul>
        <Link href="/chatbot" className={styles.link}>
          <button className={styles.chatbotBtn}>Chatbot</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
