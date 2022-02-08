import { Grid } from "@mui/material";
import GameBoardRow from "../GameBoardRow";
import { v4 as uuid } from 'uuid';
import { IGameBoardProps } from "../../types";

const GameBoard = (props: IGameBoardProps) => {

    const { guesses, answer } = props;
    const gridStyles = {
        container: {
            maxWidth: "320px",
            margin: "0 auto",
            marginTop: "10px",
            marginBottom: "20px"
        },
        item: {
            border: "1px solid white",
            color: "white"
        }
    }
    return (
        <Grid container columns={answer.length} spacing={0} style={gridStyles.container}>
            {answer.split('').map((_: string, index: number) => {
                return <GameBoardRow answer={answer} guess={guesses[index]} key={uuid()} />
            })}
        </Grid>);
};

export default GameBoard;
