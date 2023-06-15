import styles from './index.module.scss';

function Container({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}
export default Container;
