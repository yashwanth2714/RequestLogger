/*
    The AccordionWrapper component is a reusable React component that encapsulates Material-UI's Accordion,
    AccordionSummary, and AccordionDetails components. It serves as a wrapper for content that needs to be displayed
    in an accordion format. The component receives the summary and details sections as props, along with parameters
    for managing the accordion's expanded state and toggling functionality. Local styles defined in "AccordionWrapper.css"
    are applied to customize the appearance of the accordion.
*/


// Import Material-UI components for creating accordions
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import local styles for the component
import "./AccordionWrapper.css";

// Functional component for wrapping content in an accordion
function AccordionWrapper({ summary, details, expanded, onToggle }) {
    // Render an Accordion with a summary and details section
    return (
        <Accordion className='accordionWrapperSection' expanded={expanded} onChange={onToggle}>
            {/* Accordion summary with an expand icon */}
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className='accordionWrapperHeader'
            >
                <Typography component="span">
                    {/* Display the provided summary content */}
                    {summary}
                </Typography>
            </AccordionSummary>

            {/* Accordion details section */}
            <AccordionDetails className='accordionWrapperDetails'>
                {/* Display the provided details content */}
                {details}
            </AccordionDetails>
        </Accordion>
    );
}

// Export the AccordionWrapper component as the default export
export default AccordionWrapper;
