import React from "react";
import styles from "./nextLayout.module.css";

interface Props {
  children?: React.ReactNode;
}

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <div className={styles.layout_next}>{children}</div>
    </>
  );
};
