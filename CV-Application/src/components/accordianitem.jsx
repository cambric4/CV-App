import React from "react";
import { useId } from "react";

export default function AccordianItem ({ title, children, isActive = false , onToggle, className }) {
    const id = useId();
    const titleId = `accordian-title-${id}`;
    const contentId = `accordian-content-${id}`; 

    return (
        <div className="accordian-item"> 
            <h2 id={titleId}>
                <button
                    className="accordian-trigger"
                    aria-expanded={isActive}
                    aria-controls={contentId}
                    onClick={onToggle}
                >
                    {title}
                </button>
            </h2>
            <div
                className="accordian-content"
                role="region"
                aria-labelledby={titleId}
                aria-hidden={!isActive}
                id={contentId}
                inert={!isActive}
            >
                <div className={`${className}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
