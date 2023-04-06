
import './GameWindow.scss';
import '../Game/Game.scss';

import Game from '../Game/Airplane/Game';

export default function GameWindow() {
    return (
        <div className="game-window">
            <Game/>
        </div>
    );
}