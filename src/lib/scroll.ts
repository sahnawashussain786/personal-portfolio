/**
 * Shared mutable bridge between the DOM scroll (framer-motion)
 * and the WebGL world (react-three-fiber useFrame).
 * Mutating a plain object avoids re-renders at 60fps.
 */
export const scrollProgress = { current: 0 };

/** Total camera travel depth through the 3D world. */
export const SCENE_DEPTH = 34;
