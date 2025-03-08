import { useState } from "react"

const Card = ({title}) =>{
  const [hasLiked, setHasLiked] = useState(false);
  return(
    <div className="card">
      {title}
      <button className="btn" onClick={() => setHasLiked(!hasLiked)}>
        { hasLiked ? '❤️' : '🤍' }
      </button>
    </div>
  )
}
const App = () =>{

  return(
    <>
    <div className="card-container">
      <Card title="Title #1"/>
      <Card title="Title #2"/>
      <Card title="Title #3"/>
    </div>
    </>
  )
}

export default App
