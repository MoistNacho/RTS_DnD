import React, { memo } from 'react';
import { Content } from '../App';
import styles from './Header.module.css';

interface HeaderProps{
    setContent:(title:Content)=>void;
};

const Header = memo(({setContent}:HeaderProps) => {

    const onClick = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!(e.target instanceof HTMLLIElement)) {
            return;
        }
        const id:Content = e.target.id as Content;
        setContent(id);
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>RTS DnD</h1>
            <ul className={styles.list} onClick={onClick}>
                <li id="Image">
                    Image
                    <svg preserveAspectRatio="none" viewBox="0 0 546.714 178.143"><path d="M546.214 89.072c0 48.917-122.162 88.571-272.857 88.571C122.662 177.643.5 137.988.5 89.072.5 40.155 122.662.5 273.357.5c150.695 0 272.857 39.655 272.857 88.572z"/></svg>
                </li>
                <li id="Video">
                    Video
                    <svg preserveAspectRatio="none" viewBox="0 0 546.714 178.143"><path d="M546.214 89.072c0 48.917-122.162 88.571-272.857 88.571C122.662 177.643.5 137.988.5 89.072.5 40.155 122.662.5 273.357.5c150.695 0 272.857 39.655 272.857 88.572z"/></svg>
                </li>
                <li id="Note">
                    Note
                    <svg preserveAspectRatio="none" viewBox="0 0 546.714 178.143"><path d="M546.214 89.072c0 48.917-122.162 88.571-272.857 88.571C122.662 177.643.5 137.988.5 89.072.5 40.155 122.662.5 273.357.5c150.695 0 272.857 39.655 272.857 88.572z"/></svg>
                </li>
                <li id="Task">
                    Todo
                    <svg preserveAspectRatio="none" viewBox="0 0 546.714 178.143"><path d="M546.214 89.072c0 48.917-122.162 88.571-272.857 88.571C122.662 177.643.5 137.988.5 89.072.5 40.155 122.662.5 273.357.5c150.695 0 272.857 39.655 272.857 88.572z"/></svg>
                </li>
            </ul>
        </header>
    );
});

export default Header;