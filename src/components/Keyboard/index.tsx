import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { IKeyboardProps } from "../../types";


const Keyboard = (props: IKeyboardProps) => {
    const { guesses, answer, handleKeyClick, submitFunc, handleBackspace } = props
    const [guessedLetters, setGuessedLetters] = useState<string[]>();
    const topRow = 'qwertyuiop'.toUpperCase().split('');
    const middleRow = 'asdfghjkl'.toUpperCase().split('');
    const bottomRow = 'zxcvbnm'.toUpperCase().split('');
    const allKeys = topRow.concat(middleRow.concat(bottomRow));

    useEffect(() => {
        window.addEventListener('keydown', handlePhysicalKeyPress);
    }, [])

    useEffect(() => {
        const allGuessedCharacters = guesses.join('').split('');
        const uniqueGuessedCharacters = allGuessedCharacters.filter((val: string, index: number, self) => self.indexOf(val) === index)
        setGuessedLetters(uniqueGuessedCharacters);
    }, [guesses])

    const handleVirtualKeyPress = (e: any) => {
        handleKeyClick(e.target.textContent)
    }

    const handlePhysicalKeyPress = (e: KeyboardEvent) => {
        if (allKeys.includes(e.key.toUpperCase())) {
            handleKeyClick(e.key.toUpperCase());
        } else if (e.key === 'Backspace') {
            handleBackspace(e);
        }
    }

    const genKeyStyles = (character: string, _: number): SxProps<Theme> => {
        character = character.toLowerCase()
        const styles = {
            width: character === "bs" || character === "enter" ? "61px" : "31px",
            marginX: "1px",
            marginY: "1px",
            borderRadius: "5px",
            height: "50px",
            color: "black",
            textAlign: "center",
            backgroundColor: "#DDD",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
        if (guessedLetters) {
            if (answer.indexOf(character) >= 0 && guessedLetters.indexOf(character) >= 0) {
                styles.backgroundColor = "green"
            } else if (answer.indexOf(character) < 0 && guessedLetters.indexOf(character) >= 0) {
                styles.backgroundColor = "#777"
            }
        }
        return styles
    }

    return <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "10px", }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            {topRow.map((letter: string, index: number) => {
                return (
                    <Box sx={genKeyStyles(letter, index)} key={uuid()} onClick={handleVirtualKeyPress}>
                        <Typography key={uuid()}>{letter}</Typography>
                    </Box>
                )
            })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            {middleRow.map((letter: string, index: number) => {
                return (
                    <Box sx={genKeyStyles(letter, index)} key={uuid()} onClick={handleVirtualKeyPress}>
                        <Typography key={uuid()}>{letter}</Typography>
                    </Box>
                )
            })}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={genKeyStyles("enter", 1)} key={uuid()} onClick={submitFunc}>
                <Typography key={uuid()}>enter</Typography>
            </Box>

            {bottomRow.map((letter: string, index: number) => {
                return (
                    <Box sx={genKeyStyles(letter, index)} key={uuid()} onClick={handleVirtualKeyPress}>
                        <Typography key={uuid()}>{letter}</Typography>
                    </Box>
                )
            })}
            <Box sx={genKeyStyles("bs", 1)} key={uuid()} onClick={handleBackspace}>
                <Typography key={uuid()}><BackspaceIcon /></Typography>
            </Box>
        </Box>
    </Box>
};

export default Keyboard;
