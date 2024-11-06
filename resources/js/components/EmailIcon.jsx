// EmailIcon.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; 
function EmailIcon() {
    return (
        <div>
            <FontAwesomeIcon icon={faEnvelope} />
        </div>
    );
}

export default EmailIcon;
