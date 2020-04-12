import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from '../../Navigation/Navigationitem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem  links="/" active>Burger Builder</NavigationItem>
        <NavigationItem links="/">Check out</NavigationItem>
    </ul>
);

export default navigationItems;