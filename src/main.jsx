import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Canvas } from "@react-three/fiber";
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas camera={{ position: [90, 90, 100] }}>
      <App />
    </Canvas>
  </React.StrictMode>,
)
