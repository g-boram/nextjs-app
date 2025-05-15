import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.head}>
        <div className={styles.headText_1}>Head Text-1</div>
        <div className={styles.headText_2}>Head Text-2</div>
        <ul className={styles.list_wrapper}>
          <li>
            <a href="#" className={styles.list_item}>
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a href="#" className={styles.list_item}>
              이용약관
            </a>
          </li>
          <li>
            <a href="#" className={styles.list_item}>
              공지사항
            </a>
          </li>
          <li>
            <a href="#" className={styles.list_item}>
              회사정보
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.desc}>Footer Test Text | Footer Test Text | Footer Test Text</div>
    </footer>
  );
}
