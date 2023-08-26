import { Tooltip, Typography } from '@mui/material';
import './nav.css';

const Nav = () => {
    // const nav = useNavigate();

    return (
        <nav className="appNav">
            <Tooltip title="Back to Main Menu">
            <div className="logo" onClick={() => window.location.reload()}>
                <Typography variant="overline" display="block" component="h2" sx={{textAlign: 'center'}}>
                    STUDY DUEL
                </Typography>
            </div>
            </Tooltip>
            {/* <div>
                New Game
            </div> */}
        </nav>
    )
}

export default Nav;