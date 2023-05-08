import { Canvas } from "@react-three/fiber";
import {AiCommunication} from '../components/AiCommunication';

export const AiCommunicationPage = () => (
    <Canvas camera={{ position: [-20, 20, 90] }} >
        <AiCommunication />
    </Canvas>
)