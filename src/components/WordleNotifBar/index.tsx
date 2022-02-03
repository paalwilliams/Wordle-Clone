import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


interface ISnackbarProps {
    message: string,
    duration: number
}
const WordleNotifbar = (props: ISnackbarProps) => {
    const { message, duration } = props;
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={1000}
                message={message}
            />
        </div>
    );
};

export default WordleNotifbar;
