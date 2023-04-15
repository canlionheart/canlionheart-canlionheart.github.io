import { useState } from "react";
import { WorldObj } from "../Object/WorldObj";


function useWorldObjs(): [WorldObj[], (obj: WorldObj) => void, (id: number) => void] {
  const [worldObjs, setWorldObjs] = useState<WorldObj[]>([]);

  function addWorldObj(objToAdd: WorldObj) {
    setWorldObjs(prevWorldObjs => [...prevWorldObjs, 
        objToAdd
    ]);
  }

  function removeComponent(id: number) {
    setWorldObjs(prevWorldObjs =>
      prevWorldObjs.filter(worldObj => worldObj.id !== id)
    );
  }

  return [worldObjs, addWorldObj, removeComponent];
}

export default useWorldObjs;