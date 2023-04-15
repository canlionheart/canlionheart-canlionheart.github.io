import { useState } from "react";
import { WorldObj } from "../Object/WorldObj";

function useWorldObjs(): [WorldObj[], (obj: WorldObj) => void, (index: number) => void] {
  const [worldObjs, setWorldObjs] = useState<WorldObj[]>([]);

  function addWorldObj() {
    setWorldObjs(prevWorldObjs => [...prevWorldObjs, 
        {
            index: prevWorldObjs.length,
            onRemove: () => removeComponent(prevWorldObjs.length)
        }
    ]);
  }

  function removeComponent(index: number) {
    setWorldObjs(prevWorldObjs =>
      prevWorldObjs.filter(worldObj => worldObj.index !== index)
    );
  }

  return [worldObjs, addWorldObj, removeComponent];
}

export default useWorldObjs;