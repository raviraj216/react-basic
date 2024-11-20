import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { Error } from '../error/Error';
import styles from './loader.module.css';

export default function Loader({ children, loading, error }) {
  if (loading) {
    return <div className={styles.loader__container}>Loading... <BiLoaderAlt className={styles.loader}/></div>;
  }
  if (error) {
    return <>
    {children}
    <Error>{error}</Error>
    </>;
  }

  return children;
}
