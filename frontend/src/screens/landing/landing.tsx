import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import './landing.css';
import { useRef, useState } from "react";
import { DeckType, datasets, importedDeck } from "../../assets/data";
import Nav from "../../components/nav";
import AddIcon from '@mui/icons-material/Add';

export type LandingScreenProps = {
    startLoading: () => void;
    startJoining: () => void;
}

const LandingScreen = (props: LandingScreenProps) => {

    const [decks, setDecks] = useState<DeckType[]>(datasets);

    const inputFile = useRef<HTMLInputElement | null>(null);
    const openFile = () => {
        inputFile.current.click();
    }

    return (
        <section>
            <Nav />
            <Grid container>
                <Grid item xs={3} className="menu">
                    <h2>Mind Match</h2>
                    <img src="./logo.png" alt="logo of app"/>
                    <p>Transform your study decks into thrilling challenges as you engage in real-time duels with friends.</p> <p>Embrace collaborative learning and elevate your educational experience through exciting gameplay. Join us today and revolutionize the way you learn and have fun!</p>
                </Grid>
                <Grid item container xs={9} columnSpacing={6} rowSpacing={5} className="decks">
                    {
                        decks.map(deck => <DeckCard {...deck} />)
                    }
                    <AddDeck 
                        inputFile={inputFile} 
                        openFile={openFile}
                        setDecks={setDecks}
                        decks={decks}
                    />
                </Grid>
            </Grid>
        </section>
    )
}

type AddDeckProps = {
    inputFile: React.MutableRefObject<null>;
    openFile: () => void;
    decks: DeckType[];
    setDecks: (decks: DeckType[]) => void;

}

const AddDeck = (props: AddDeckProps) => {
    return (
        <Grid item xs={4}>
            <div className="deckCard addCard">
                    <Button className="addbtn" onClick={props.openFile}>
                        <AddIcon fontSize="large"/>
                        <input 
                            type='file' 
                            id='file' 
                            ref={props.inputFile} 
                            style={{display: 'none'}}
                            onChange={() => props.setDecks([
                                ...props.decks,
                                importedDeck
                            ])}
                        />
                    </Button>
            </div>
        </Grid>
    )
}

const DeckCard = (props: DeckType) => {
    const numberOfCards = props.data.length;

    return (
    <Grid item xs={4}>
            <div className="deckSet">
                <Card className="deckCard">
                    <span>{props.name}</span>
                    <span>{numberOfCards} questions</span>
                    <Button variant="contained" sx={{
                        backgroundColor: props.color,
                        color: props.color === "yellow" ? "black" : "white"
                    }}>PLAY</Button>
                </Card>
                <Card className="deckCard" sx={{backgroundColor: props.color}}></Card>
                <Card className="deckCard" sx={{backgroundColor: props.color}}></Card>
            </div>
    </Grid>
    )
}

export default LandingScreen;