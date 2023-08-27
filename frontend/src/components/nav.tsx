import { Tooltip, Typography } from '@mui/material';
import './nav.css';

export type NavScreenProps = {
    startJoining: () => void;
}

const Nav = (props: NavScreenProps) => {
    // const nav = useNavigate();
    const restart = () => window.location.reload()

    return (
        <nav className="appNav">
            <Tooltip title="Back to Main Menu">
                <div className="logo" onClick={restart}>
                    <Typography variant="overline" display="block" component="h2" sx={{textAlign: 'center'}}>
                        MIND MATCH
                    </Typography>
                </div>
            </Tooltip>
            <Tooltip title="Start a New Game">
                <div className="newGame" onClick={restart}>
                    <span>New Game</span>
                </div>
            </Tooltip>
            <Tooltip title="Join a Game">
                <div className="newGame" onClick={props.startJoining}>
                    <span>Join Game</span>
                </div>
            </Tooltip>
        </nav>
    )
}

export default Nav;