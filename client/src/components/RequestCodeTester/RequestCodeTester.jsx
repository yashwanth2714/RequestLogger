/*
    The RequestCodeTester component is a React component designed for testing RequestLogger.
    It provides a user interface for generating and displaying BML code based on the current tunnelURL.
    Users can switch between tabs to view the generated BML code and perform a test request to check the endpoint connection.
    The component leverages Material-UI components, syntax highlighting, and alerts for a user-friendly experience.
    Additionally, it allows users to copy the generated code to the clipboard for further use.
*/


// Import necessary hooks from React
import { useContext, useState } from 'react';

// Import third-party packages
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Import local components and context
import AccordionWrapper from '../Accordion/AccordionWrapper';
import sendPostRequest from '../../utils/sendRequest';
import CopyToClipboardButton from '../Shared/CopyToClipboardButton';
import { RequestContext } from '../../context/request_context';
import { bmlCode } from '../../utils/Helper';

// Import styles
import './RequestCodeTester.css';

// Constants for tab indices
const BML_TAB_INDEX = 0;
const TEST_TAB_INDEX = 1;

// RequestCodeTester component
const RequestCodeTester = () => {
    // Access the theme from Material-UI
    const theme = useTheme();
    
    // Access values from the RequestContext
    const { tunnelURL } = useContext(RequestContext);

    // State for managing tab value, test results, and alert state
    const [value, setValue] = useState(0);
    const [testResult, setTestResult] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');

    // Handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Handle sending a test request
    const handleSendRequest = async () => {
        const result = await sendPostRequest(tunnelURL);
        setSeverity(result?.Status !== 'Failed!' ? 'success' : 'error');
        setTestResult(JSON.stringify(result));
        setOpen(true);
    };

    // Generate BML code for the current tunnelURL
    const code = bmlCode(tunnelURL);

    // Render the test tab content
    const renderTestTab = () => (
        <>
            <Typography>
                <b>Send the request to check the endpoint connection. If successful, just refresh the page to see the new data.</b>
            </Typography>
            <div className='testTab'>
                <Button className='sendRequestBtn' startIcon={<SendIcon />} variant="outlined" onClick={handleSendRequest}>
                    Send Request
                </Button>
                {open && (
                    <Alert severity={severity} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>
                        {testResult}
                    </Alert>
                )}
            </div>
        </>
    );

    // Define summary content for the accordion
    const accordionSummary = (<b>Sample Code</b>);
    
    // Define details content for the accordion
    const accordionDetails = (
        <AccordionDetails code={code} theme={theme} value={value} onChange={handleChange} renderTestTab={renderTestTab} tunnelURL={tunnelURL} />
    );

    // Render the RequestCodeTester component
    return (
        <Box component="section" className='accordionSection'>
            <AccordionWrapper summary={accordionSummary} details={accordionDetails} />
        </Box>
    );
};

// Details component for the accordion
const AccordionDetails = ({ code, theme, value, onChange, renderTestTab, tunnelURL }) => {
    // Styles for the section
    const styles = {
        section: { textAlign: 'left' }
    };

    // Render the details section with tabs
    return (
        <Box component="section" sx={styles.section}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={onChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    className='tabsAppBar'
                >
                    {/* BML tab */}
                    <Tab label="BML" {...a11yProps(BML_TAB_INDEX)} />
                    
                    {/* Test tab */}
                    <Tab label="Test" {...a11yProps(TEST_TAB_INDEX)} />
                </Tabs>
            </AppBar>

            {/* BML code panel */}
            <TabPanel value={value} index={BML_TAB_INDEX} dir={theme.direction}>
                <div className='codeTab'>
                    <SyntaxHighlighter language="javascript" style={stackoverflowLight} showLineNumbers>
                        {code}
                    </SyntaxHighlighter>
                    <CopyToClipboardButton textToCopy={code} />
                </div>
            </TabPanel>

            {/* Test tab panel */}
            <TabPanel value={value} index={TEST_TAB_INDEX} dir={theme.direction}>
                {tunnelURL && renderTestTab()}
            </TabPanel>
        </Box>
    );
};

// TabPanel component for rendering tab content
const TabPanel = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box sx={{ p: 3 }}>
                <Typography component="span">{children}</Typography>
            </Box>
        )}
    </div>
);

// PropTypes for TabPanel component
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// Function to generate accessibility props for tabs
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

// Export the RequestCodeTester component as the default export
export default RequestCodeTester;
