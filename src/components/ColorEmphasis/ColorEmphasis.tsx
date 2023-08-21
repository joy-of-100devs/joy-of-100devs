import * as React from 'react';
import styles from './styles.module.css';
function ColorEmphasis(props: {children?: React.ReactNode }) {
  return <span className={styles.emphasis}>{props.children}</span>;
}

export default ColorEmphasis;
