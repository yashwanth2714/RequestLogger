/*
    The RequestBodyDetails component is a React component responsible for displaying and managing
    the details of HTTP requests made through RequestLogger. It fetches and updates the list of requests,
    displays each request's timestamp, and allows users to expand/collapse request details.
    The component utilizes React hooks, context, Material-UI components, and third-party libraries
    for JSON rendering. Each request is presented in an accordion format, allowing users to copy
    the request payload to the clipboard. Additionally, the component provides instructions for refreshing
    the page after making a request and includes functionality to expand or collapse all request details.
*/


// Import necessary hooks from React
import { useEffect, useState, useContext, memo } from 'react';

// Import third-party packages
import axiosInstance from '../../utils/axiosInstance';
import { JsonView, collapseAllNested, defaultStyles } from 'react-json-view-lite';
import stringify from 'json-stringify-pretty-compact';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import local components and context
import CopyToClipboardButton from '../Shared/CopyToClipboardButton';
import AccordionWrapper from '../Accordion/AccordionWrapper';
import { RequestContext } from '../../context/request_context';
import { getFormattedDate, timeAgo } from '../../utils/Helper';

// Import styles
import 'react-json-view-lite/dist/index.css';
import './RequestBodyDetails.css';

// Define the endpoint URL for retrieving requests
const REQUESTS_URL = '/requests';

// Functional component for displaying request details
const RequestBodyDetails = () => {
    // Destructure values from the RequestContext
    const { requests, updateRequests } = useContext(RequestContext);

    // State for handling errors, expansion of all and individual accordions
    const [error, setError] = useState('');
    const [expandedAll, setExpandedAll] = useState(true); // Expanded state for all accordions
    const [expandedStates, setExpandedStates] = useState(() => new Array(requests.length).fill(true)); // Expanded state for each accordion

    // useEffect to fetch and update requests data when the component mounts or updates
    useEffect(() => {
        const getRequests = async () => {
            try {
                // Make a GET request to retrieve current requests
                const response = await axiosInstance.get(REQUESTS_URL);

                // Destructure data from the response
                const { currentRequests } = response?.data;

                // If the request is successful (status code 200)
                if (response?.status === 200) {
                    // Update requests and expanded states, reset error
                    updateRequests(currentRequests.reverse());
                    setExpandedStates(new Array(currentRequests.length).fill(true));
                    setError('');
                }
            } catch (error) {
                // Log and set error message if the request encounters an error
                console.log('Axios Request Error: ', error);
                setError(error.message);
            }
        };

        // Call the getRequests function
        getRequests();
    }, [updateRequests]);

    // Function to toggle an accordion item's expansion state
    const handleAccordionItemToggle = (index) => {
        setExpandedStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    // Function to expand or collapse all accordions
    const handleAccordionsExpandCollapse = () => {
        setExpandedStates(new Array(requests.length).fill(!expandedAll));
        setExpandedAll(!expandedAll);
    };

    // Memoized AccordionItem component for individual request items
    const AccordionItem = memo(({ request, index }) => {
        // Destructure key and value from the request object
        const key = Object.keys(request)?.[0];
        const value = Object.values(request)?.[0];
        const textToCopy = stringify(value, { maxLength: 80, indent: 4 });

        // Get formatted date and time ago result for display
        const date = getFormattedDate(new Date(key));
        const timeAgoResult = timeAgo(new Date(date));

        // JSX for accordion summary and details
        const accordionSummary = (
            <Typography>
                <b>{date}</b>
                <span className="timeAgo">({timeAgoResult.toLowerCase()})</span>
            </Typography>
        );

        const accordionDetails = (
            <>
                {/* Render JSON data using react-json-view-lite */}
                <JsonView data={value} shouldExpandNode={collapseAllNested} style={defaultStyles} />
                {/* Component for copying JSON data to clipboard */}
                <CopyToClipboardButton textToCopy={textToCopy} />
            </>
        );

        // Render the AccordionWrapper with summary and details
        return (
            <div key={key}>
                <AccordionWrapper
                    summary={accordionSummary}
                    details={accordionDetails}
                    expanded={expandedStates[index]}
                    onToggle={() => handleAccordionItemToggle(index)}
                />
            </div>
        );
    });

    // Generate content by mapping through requests and rendering AccordionItems
    let content = requests.map((request, index) => (
        <AccordionItem key={index} request={request} index={index} />
    ));

    // Display an error message if there's an error
    if (error) {
        content = <p className="errorMessage">{error}</p>;
    }

    // Render the RequestBodyDetails component
    return (
        <Box component="section" className="requestBodyDetailsSection">
            {/* Header section with instructions and expand/collapse button */}
            <div className="requestBodyDetailsSectionHeader">
                <p>
                    <b>After making a request, refresh the page to view the data.</b>
                </p>
                {/* Render expand/collapse button if there are requests */}
                {requests.length ? (
                    <Tooltip title={expandedAll ? 'Collapse' : 'Expand'} placement="left">
                        <IconButton color="inherit" size="large" onClick={handleAccordionsExpandCollapse}>
                            {expandedAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Tooltip>
                ) : (
                    ''
                )}
            </div>

            {/* Render content (accordion items) */}
            <div>{content}</div>
        </Box>
    );
};

// Export the RequestBodyDetails component as the default export
export default RequestBodyDetails;
