import Link from "next/link";
import React from "react";
import styles from "./navigation.module.css";

export default function Navigation() {
  return (
    <nav className="font-mono">
      <ul className="flex md:space-x-4 flex-col md:flex-row">
        <li>
          <Link href="/" className={styles.Link}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
