import { memo } from "react";
import styles from "../../../../../styles/Home.module.css";

// eslint-disable-next-line react/display-name
const AnimationStrWaiting = memo(() => {
  return (
    <div className="pt-10 pb-6 text-2xl sm:text-3xl capitalize tracking-widest">
      <h1 className={styles.updown}>
        <span>W</span>
        <span>a</span>
        <span>i</span>
        <span>t</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>&nbsp;</span>
        <span>M</span>
        <span>e</span>
        <span>m</span>
        <span>b</span>
        <span>e</span>
        <span>r</span>
        <span>s</span>
        <span>...</span>
      </h1>
    </div>
  );
});

export default AnimationStrWaiting;
