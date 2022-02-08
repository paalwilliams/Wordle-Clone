import { IconButton } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';

interface IHeaderProps {
    handleSettingsClick: any
}
export const Header = (props: IHeaderProps) => {

    const { handleSettingsClick } = props

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <AppBar position="static" sx={{ backgroundColor: "#121212" }}> */}
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: "white" }}>
                    Wordle Clone
                </Typography>
                <IconButton aria-label="delete" onClick={handleSettingsClick} sx={{ position: "absolute", right: "20px" }}>
                    <SettingsIcon color="primary" />
                </IconButton>
            </Toolbar>
            {/* </AppBar> */}
        </Box >
    );
}

export default Header;