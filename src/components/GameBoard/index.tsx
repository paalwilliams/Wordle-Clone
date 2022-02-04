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
            maxWidth: "450px",
            margin: "0 auto",
            marginTop: "50px"
        },
        item: {
            border: "1px solid white",
            color: "white"
        }
    }
    return (
        <Grid container spacing={0} style={gridStyles.container}>
            {answer.split('').map((_: string, index: number) => {
                return <GameBoardRow answer={answer} guess={guesses[index]} />
            })}
        </Grid>);
};

export default GameBoard;
