'use client'
import React from 'react'
import styles from "./styles.module.sass"
import {useState} from "react";
import tarotCards from './tarotCards';

export default function TarotDesk() {
    const numbers = Array.from({ length: 78 }, (_, index) => index + 1);
    const maxSelectedCards = 3; // Максимальное количество выбранных карт
    // State to store selected cards
    const [selectedCards, setSelectedCards] = useState([]);
    const [animatingCard, setAnimatingCard] = useState(null);
    const [fullCardInfo, setFullCardInfo] = useState(null)

    // Function to handle card click
    const handleCardClick = (card) => {
        if (selectedCards.includes(card) || selectedCards.length >= maxSelectedCards) return;

        if (selectedCards.includes(card)) return;

        setAnimatingCard(card); // Запуск анимации
        setTimeout(() => {
            setSelectedCards([...selectedCards, card]);
            setAnimatingCard(null); // Удаление анимации после завершения
        }, 500);
    };

    const showFullCard = (card) => {
        setFullCardInfo(card)
    }

    return (
  
            <>
        {fullCardInfo && (
            <div className={styles.fullCard} onClick={() => showFullCard(null)}>
                {/* Render fullCardInfo or other elements */}
                <div>
                    <img src={`${import.meta.env.BASE_URL}images/${fullCardInfo.image}`} alt={fullCardInfo.title}/>
                    <h2>{fullCardInfo.title}</h2>
                    <p>{fullCardInfo.description}</p>
                </div>
            </div>
        )}

        <div className={styles.desk}>
            <div className={styles.stack_select}>
                {/* <h2>Select Cards</h2> */}
                <ul>
                    {selectedCards.map(card => (
                        <li
                            key={card}
                            onClick={() => showFullCard(card)}>
                            <div className={styles.card_false}>
                                <figure>
                                    <img src={`${import.meta.env.BASE_URL}images/${card.image}`} alt={card.title}/>
                                </figure>
                            </div>
                            {/* <p>{card.title}</p> */}
                            {/* <p>{card.description}</p> */}
                        </li>
                    ))}

                    {/* Добавление пустых ячеек, если карт меньше 9 */}
                    {Array.from({ length: maxSelectedCards - selectedCards.length }).map((_, index) => (
                        <li key={`empty-${index}`} className={styles.emptyCard}>
                            {/* <p>Empty slot</p> */}
                        </li>
                    ))}

                </ul>
            </div>

            <div style={
                {
                    // overflow: 'scroll',
                    // position: 'fixed',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    padding: '0 20px 20px',
                    // background: 'linear-gradient(transparent, black)'
                }
            }>
                <div className={styles.stack}>
                    {tarotCards.map(card => (
                        <div
                            key={card}
                            onClick={() => handleCardClick(card)}
                            className={`${styles.card_true} ${animatingCard === card ? styles.animateMove : ''}`}
                        >
                            <p>{card.id}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}