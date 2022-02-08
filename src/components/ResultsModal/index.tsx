import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WordleNotifbar from "../WordleNotifBar";
import { IResultsModalProps } from "../../types";

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

const ResultsModal = (props: IResultsModalProps) => {

    const [copyConfirm, setCopyConfirm] = useState<boolean>(false)
    const { open, result, guesses, answer } = props;
    const handleReload = (): void => {
        window.location.reload();
    }

    const genClipboardMessage = (): string => {
        return `${answer.length} letter wordle, ${guesses}/${answer.length} guesses \n${result.resultsSquare}`
    }

    const handleShare = (): void => {
        navigator.clipboard.writeText(genClipboardMessage()).then(function () {
            setCopyConfirm(true);
            setTimeout(() => {
                setCopyConfirm(false);
            }, 1000)
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
            {copyConfirm ? <WordleNotifbar message={"Results Copied To Clipboard"} duration={1000} /> : <></>}
        </div>
    )
};

export default ResultsModal;
