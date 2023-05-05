import React from 'react'
import ReactDOM from 'react-dom/client'
import FrameGenerator from './FrameGenerator.jsx'
import Typography from './Typography.jsx'
import { Canvas } from "@react-three/fiber";
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Frame Generator Camera <Canvas camera={{ position: [90, 90, 100] }} > */}
    <Canvas camera={{ position: [0, 30, 200] }} >
      <Typography />
    </Canvas >
  </React.StrictMode>,
)
