import React , {useState} from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";



function Loader() {
   

let [loading] = useState(true);

  return (
    <div style={{marginTop:'200px'}}>
    <div className="sweet-loading text-center">
    <ScaleLoader
      color='#000'
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
    </div>
  )
}

export default Loader
