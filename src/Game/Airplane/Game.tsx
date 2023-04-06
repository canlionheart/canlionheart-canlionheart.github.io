
import Sky from './World/Sky';
import Flyer from './Object/Flyer';
export default function Airplane() {
    return (
        <div className="game-base">
            <Sky/>
            <Flyer/>
        </div>
    );
}