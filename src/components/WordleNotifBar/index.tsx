import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { IWordleNotifBarProps } from "../../types";

const WordleNotifbar = (props: IWordleNotifBarProps) => {
    const { message, duration } = props;
    const [open, setOpen] = useState<boolean>(true)

    const handleClose = (_: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={duration}
                message={message}
            />
        </>
    );
};

export default WordleNotifbar;
