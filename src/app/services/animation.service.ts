import { Injectable, ElementRef } from '@angular/core';
import { animate, stagger, createAnimatable, onScroll, utils } from 'animejs';
import type {
    HeaderAnimationConfig,
    MenuAnimationConfig,
    ScrollAnimationConfig,
    AnimatableConfig
} from '../interfaces/animation.interface';

/**
 * AnimationService
 * Siguiendo el principio SOLID - Single Responsibility
 * Este servicio solo se encarga de manejar animaciones con anime.js
 */
@Injectable({
    providedIn: 'root'
})
export class AnimationService {

    private defaultEasing = 'outExpo';
    private isMobile = false;

    constructor() {
        this.checkMobile();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', () => this.checkMobile());
        }
    }

    /**
     * Detecta si es dispositivo móvil para ajustar animaciones
     */
    private checkMobile(): void {
        if (typeof window !== 'undefined') {
            this.isMobile = window.innerWidth < 768;
        }
    }

    /**
     * Anima la entrada del header con fade-in y slide-down
     * Responsive: duración más corta en móvil
     */
    animateHeader(headerElement: HTMLElement, config: HeaderAnimationConfig = {}): void {
        const duration = this.isMobile ? 400 : config.duration ?? 600;
        const translateY = config.translateY ?? -30;

        animate(headerElement, {
            translateY: [translateY, 0],
            opacity: config.opacity ?? [0, 1],
            duration,
            delay: config.delay ?? 100,
            ease: config.easing ?? this.defaultEasing
        });
    }

    /**
     * Anima los links del menú con efecto stagger (escalonado)
     * Responsive: reduce la animación en móvil
     */
    animateMenuLinks(menuSelector: string, config: MenuAnimationConfig = {}): void {
        const staggerDelay = this.isMobile ? 30 : config.staggerDelay ?? 50;
        const duration = this.isMobile ? 300 : config.duration ?? 500;

        animate(menuSelector, {
            translateY: [-10, 0],
            opacity: [0, 1],
            scale: [config.scaleFrom ?? 0.95, config.scaleTo ?? 1],
            delay: stagger(staggerDelay, { start: config.delay ?? 200 }),
            duration,
            ease: config.easing ?? this.defaultEasing
        });
    }

    /**
     * Crea un animatable para efectos hover interactivos
     * Ideal para menús con respuesta fluida
     */
    createMenuHoverAnimatable(element: HTMLElement, config: AnimatableConfig = {}): any {
        return createAnimatable(element, {
            scale: config.duration ?? 200,
            ease: config.ease ?? 'out(3)'
        });
    }

    /**
     * Configura animaciones basadas en scroll usando onScroll de anime.js
     * Responsive: ajusta thresholds para móvil
     */
    setupScrollAnimation(
        targetSelector: string,
        config: ScrollAnimationConfig = {}
    ): void {
        const duration = this.isMobile ? 400 : config.duration ?? 600;

        animate(targetSelector, {
            translateY: [30, 0],
            opacity: [0, 1],
            duration,
            ease: config.easing ?? this.defaultEasing,
            autoplay: onScroll({
                enter: 'bottom',
                leave: 'top'
            })
        });
    }

    /**
     * Anima el footer cuando aparece en viewport
     */
    animateFooterOnScroll(footerSelector: string): void {
        animate(footerSelector, {
            translateY: [20, 0],
            opacity: [0, 1],
            duration: this.isMobile ? 300 : 400,
            ease: this.defaultEasing,
            autoplay: onScroll({
                enter: 'bottom'
            })
        });
    }

    /**
     * Anima elementos de contenido con fade-in al hacer scroll
     */
    animateContentOnScroll(contentSelector: string): void {
        const elements = document.querySelectorAll(contentSelector);

        elements.forEach((element, index) => {
            animate(element as HTMLElement, {
                translateY: [40, 0],
                opacity: [0, 1],
                duration: this.isMobile ? 400 : 600,
                delay: index * (this.isMobile ? 50 : 100),
                ease: this.defaultEasing,
                autoplay: onScroll({
                    enter: 'bottom',
                    leave: 'top'
                })
            });
        });
    }

    /**
     * Animación de marca/logo con efecto especial
     */
    animateBrand(brandElement: HTMLElement): void {
        animate(brandElement, {
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: this.isMobile ? 400 : 500,
            ease: 'outBack'
        });
    }

    /**
     * Crea efecto hover para elementos del menú
     * Devuelve funciones para mouseenter y mouseleave
     */
    createHoverEffect(element: HTMLElement): { enter: () => void; leave: () => void } {
        return {
            enter: () => {
                animate(element, {
                    scale: 1.05,
                    duration: 200,
                    ease: 'out(2)'
                });
            },
            leave: () => {
                animate(element, {
                    scale: 1,
                    duration: 200,
                    ease: 'out(2)'
                });
            }
        };
    }

    /**
     * Anima los resultados de búsqueda con efecto stagger
     * Fade-in + slide desde la derecha
     */
    animateSearchResults(resultSelector: string): void {
        const staggerDelay = this.isMobile ? 40 : 60;
        const duration = this.isMobile ? 300 : 400;

        animate(resultSelector, {
            translateX: [20, 0],
            opacity: [0, 1],
            delay: stagger(staggerDelay),
            duration,
            ease: this.defaultEasing
        });
    }
}
