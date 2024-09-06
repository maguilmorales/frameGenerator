import { Logo } from '../components/Logo';
import { Canvas } from "@react-three/fiber";

export const LogoPage = () => (
    <Canvas camera={{ position: [0, 0.5, 5]}} shadows>

        <Logo />
    </Canvas>
)