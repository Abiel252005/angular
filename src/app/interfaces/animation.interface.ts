/**
 * Interfaces para configuración de animaciones
 * Siguiendo el principio SOLID - Interface Segregation
 */

export interface AnimationConfig {
    duration?: number;
    delay?: number;
    easing?: string;
}

export interface HeaderAnimationConfig extends AnimationConfig {
    translateY?: number;
    opacity?: number[];
}

export interface MenuAnimationConfig extends AnimationConfig {
    staggerDelay?: number;
    scaleFrom?: number;
    scaleTo?: number;
}

export interface ScrollAnimationConfig extends AnimationConfig {
    threshold?: number;
    offset?: number;
}

export interface AnimatableConfig {
    ease?: string;
    duration?: number;
}
