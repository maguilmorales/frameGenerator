import { Stack } from '../components/Stack';
import { Canvas } from "@react-three/fiber";

export const StackPage = () => (
    <Canvas camera={{ position: [15, 5, 0] }} shadows >
        <Stack />
    </Canvas>
)