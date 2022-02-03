import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "500px" }}>
            <CircularProgress />
        </Box>
    );
}


export default Loading;
