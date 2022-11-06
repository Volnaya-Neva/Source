import React from "react";

export default function Marker({children, feature}) {
    function onClick(feature) {
    }

    return (
        <button onClick={() => onClick(feature)} className="marker">
            {children}
        </button>
    );
}