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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Five To Seven Letter Wordle
                    </Typography>
                    <IconButton aria-label="delete" onClick={handleSettingsClick} sx={{ position: "absolute", right: "20px" }}>
                        <SettingsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;