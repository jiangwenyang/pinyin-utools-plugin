import React from 'react';
import styles from './index.css';

interface ResultProps {
  hanzi: string;
  pinyin: string[][];
}

const Result = (props: ResultProps) => {
  const { hanzi, pinyin } = props;

  if (!(pinyin && pinyin.length)) return null;
  return (
    <div className={styles.result}>
      {hanzi.split('').map((hanziItem, hanziIndex) => (
        <div className={styles.resultItem} key={`${hanziItem}-${hanziIndex}`}>
          <span className={styles.pinyin}>
            {pinyin[hanziIndex] ? pinyin[hanziIndex].join(' ') : ''}
          </span>
          <span className={styles.hanzi}>{hanziItem}</span>
        </div>
      ))}
    </div>
  );
};

export default Result;
