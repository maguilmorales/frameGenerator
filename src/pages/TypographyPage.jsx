import { Typography } from '../components/Typography';
import { Canvas } from "@react-three/fiber";

export const TypographyPage = () => (
    <Canvas camera={{ position: [-20, 20, 180] }} >
        <Typography />
    </Canvas>
)