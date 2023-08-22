import * as React from 'react';
import styles from './styles.module.css';
function ColorEmphasis(props: {children?: React.ReactNode, color?: string }) {
  return <span className={styles.emphasis} style={{
    "--text-color": props.color
  } as React.CSSProperties}>{props.children}</span>;
}

export default ColorEmphasis;
