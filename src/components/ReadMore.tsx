import React, { useState } from 'react'

export default function ReadMore(props: { children: string }) {
    const text = props.children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p>
            {isReadMore && text ? text.slice(0, 280) : text}
            <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore && text.length > 280 ? "..." : ""}
            </span>
        </p>
    )
}
