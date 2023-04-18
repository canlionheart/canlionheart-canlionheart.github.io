import { useEffect, useState } from 'react';
import cloudSprite from '../Sprite/Cloud/1.png';
import styles from './Cloud.module.scss';
import {WorldObj} from './WorldObj';



export default function Cloud({ id, onRemove } : WorldObj) {

    const speed = 8;
    const minTop = 0;
    const maxTop = 30;
    let style = {};
    const [randomTop, setRandomTop] = useState(Math.floor(Math.random() * (maxTop - minTop + 1) + minTop));
    style = {top:randomTop + '%'};
    
    useEffect(() => {
        setTimeout(() => {
          onRemove();
        }, 5000);


      }, []);

    const handleAnimationEnd = () => {
      onRemove();
    };

    return (
        <div className={styles.cloud}
        onAnimationEnd={handleAnimationEnd}
        style={style}
        >
            <img src={cloudSprite}/>
        </div>
    );
}