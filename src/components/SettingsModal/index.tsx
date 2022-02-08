import { Box, Button, FormControlLabel, FormGroup, Modal, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSettingsFromLocalStorage, storeSettingsInLocalStorage } from "../Utils/localStorage";

interface ISettingsModalProps {
    isOpen: boolean,
    closeSettings: any
}
const SettingsModal = (props: ISettingsModalProps) => {

    const { isOpen, closeSettings } = props;

    const [settings, setSettings] = useState<any>({});

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


    useEffect(() => {
        let settings = getSettingsFromLocalStorage();
        if (!settings) {
            setSettings({
                hardMode: false,
                dailyWordChallenge: false
            })
            return;
        }
        setSettings(settings);
    }, [])

    const handleToggleChange = (e: any) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.checked
        })
    }

    const handleModalClose = () => {
        storeSettingsInLocalStorage(settings)
        window.location.reload()
    }

    if (!settings) {
        return <></>
    }
    return <div>
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant='h5'>Settings</Typography>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={settings["hardMode"]} name="hardMode" onChange={handleToggleChange} />} label="Hard Mode (7 letter words)" />
                    <FormControlLabel control={<Switch checked={settings["dailyWordChallenge"]} name="dailyWordChallenge" />} onChange={handleToggleChange} label="Daily Word Challenge" />
                    <Button variant="contained" onClick={handleModalClose}>Return to Game</Button>
                </FormGroup>
            </Box>
        </Modal>
    </div>;
};

export default SettingsModal;
