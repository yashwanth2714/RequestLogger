/*
    The CopyToClipboardButton component is a React component designed to provide a user-friendly way
    to copy the provided text to the clipboard. It utilizes Material-UI icons and tooltips to offer
    visual feedback on the copy action. The component dynamically updates the tooltip text to inform
    the user of the copy status, changing from "Copy to Clipboard" to "Copied!" upon successful copying,
    and resetting after a short delay.
*/


// Import React and useState hook for managing state
import React, { useState } from 'react';

// Import Material-UI icons and components
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Functional component for a copy-to-clipboard button
const CopyToClipboardButton = ({ textToCopy }) => {
    // State to manage the tooltip text
    const [tooltipText, setTooltipText] = useState('Copy to Clipboard');

    // Function to copy the provided text to the clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy);
        setTooltipText('Copied!');

        // Reset the tooltip text after a delay
        setTimeout(() => {
            setTooltipText('Copy to Clipboard');
        }, 2000);
    };

    // Render the copy-to-clipboard button with a tooltip
    return (
        <div>
            <Tooltip title={tooltipText}>
                <IconButton onClick={copyToClipboard}>
                    <ContentCopyIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

// Export the CopyToClipboardButton component as the default export
export default CopyToClipboardButton;
