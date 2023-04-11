
import './GameWindow.scss';
import '../Game/Game.scss';

import GameAirplane from '../Game/Airplane/Game';

export default function GameWindow() {
    return (
        <div className="game-window">
            <GameAirplane/>
        </div>
    );
}