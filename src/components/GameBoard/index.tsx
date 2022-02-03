import { Grid } from "@mui/material";
import React from 'react';
import GameBoardRow from "../GameBoardRow";

interface IGameBoardProps {
    guesses: string[];
    answer: string
}
const GameBoard = (props: IGameBoardProps) => {

    const { guesses, answer } = props;
    const gridStyles = {
        container: {
            minWidth: "300px",
            width: "30%",
            border: "1px solid white",
            margin: "0 auto",
            marginTop: "50px"
        },
        item: {
            border: "1px solid white",
            color: "white"
        }
    }
    return (
        <Grid container spacing={1} style={gridStyles.container}>
            <GameBoardRow answer={answer} guess={guesses[0]} />
            <GameBoardRow answer={answer} guess={guesses[1]} />
            <GameBoardRow answer={answer} guess={guesses[2]} />
            <GameBoardRow answer={answer} guess={guesses[3]} />
            <GameBoardRow answer={answer} guess={guesses[4]} />

        </Grid>);
};

export default GameBoard;
