import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxWidth: "400px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IResultsModalProps {
    open: boolean,
    result: any,
    guesses: number,
    answer: string,

}
const ResultsModal = (props: IResultsModalProps) => {
    const { open, result, guesses, answer } = props;
    const handleReload = () => {
        window.location.reload();
    }

    const genClipboardMessage = () => {
        return `${answer.length} letter wordle, ${guesses}/${answer.length} guesses \n${result.resultsSquare}`
    }

    const handleShare = () => {
        navigator.clipboard.writeText(genClipboardMessage()).then(function () {
        }, function () {


        });
    }
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Results
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {result.message}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
                    <Button onClick={handleReload}>Play Again</Button>
                    <Button onClick={handleShare}>Copy Result Grid</Button>
                </Box>
            </Modal>
        </div>
    )
};

export default ResultsModal;
