
import './GameWindow.scss';
import '../Game/Game.scss';

import Airplane from '../Game/Airplane/Airplane';

export default function GameWindow() {
    return (
        <div className="game-window">
            <Airplane/>
        </div>
    );
}