import { MediaCenter } from '../components/MediaCenter';
import { Canvas } from "@react-three/fiber";

export const MediaCenterPage = () => (
    <Canvas camera={{ position: [0, 0, 2]}} shadows>

        <MediaCenter />
    </Canvas>
)