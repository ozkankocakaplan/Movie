import React, { useState } from 'react'
import styles from '../../styles/Home.module.css';

interface IStarRatingProps {
    rating: number,
    handleRating: (val: number) => void
}

export default function StarRating(props: IStarRatingProps) {
    const [hover, setHover] = useState(0);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
            {[...Array(10)].map((star, index) => {
                index += 1;
                return (
                    <button
                        onClick={() => props.handleRating(index)}
                        id='starRating'
                        type="button"
                        key={index}
                        style={index <= (hover || props.rating) ? { color: 'rgba(255,255,255,.6)' } : { color: 'rgba(255,255,255,.2)' }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(props.rating)}
                    >
                        <span className={styles.star}>&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}
