import { useEffect, useState } from 'react';
import cloudSprite from '../Sprite/Cloud/1.png';
import styles from './Cloud.module.scss';
import {WorldObj} from './WorldObj';



export default function Cloud({ index, onRemove } : WorldObj) {

    const speed = 8;
    const [isOffscreen, setIsOffscreen] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
          setIsOffscreen(true);
        }, 5000);
      }, []);

    const handleAnimationEnd = () => {
      onRemove();
    };

    return (
        <div className={styles.cloud}
        onAnimationEnd={handleAnimationEnd}
        >
            <img src={cloudSprite}/>
        </div>
    );
}