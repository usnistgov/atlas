import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import styles from './TitleBar.css';
import earthLogo from '../../pictures/OrangeEarthLogo.png';

type Props = {

}

export default class TitleBar extends Component<Props> {
  props: Props;

  render(){

    return (
        <div className={styles.titleBar}>
            <img className={styles.Logo} src={earthLogo} />
            <h2>Atlas</h2>
            <Link className={styles.Link} to={routes.USE_CASE_CATALOG} >Use Case Catalog</Link>
            <Link className={styles.Link} to={routes.INFORMATION_TYPE_CATALOG} >Information Type Catalog</Link>
            <Link className={styles.Link} to={routes.GLOSSARY} >Glossary</Link>
        </div>
    )


  }
 }