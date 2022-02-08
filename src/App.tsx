import Header from "./components/Header";
import GameContainer from "./components/GameContainer";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return <>
        <GameContainer />
    </>;
};

export default App;
