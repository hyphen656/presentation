// ============================================
// PISTACHIO DREAM COMPETITOR ANALYSIS
// Interactive Presentation Script
// ============================================

// Initialize Reveal.js
Reveal.initialize({
    hash: true,
    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    controls: true,
    progress: true,
    center: false,
    slideNumber: 'c/t',
    keyboard: true,
    overview: true,
    touch: true,
    loop: false,
    rtl: false,
    navigationMode: 'default',
    shuffle: false,
    fragments: true,
    fragmentInURL: true,
    embedded: false,
    help: true,
    pause: true,
    showNotes: false,
    autoPlayMedia: null,
    preloadIframes: null,
    autoAnimate: true,
    autoAnimateMatcher: null,
    autoAnimateEasing: 'ease',
    autoAnimateDuration: 1.0,
    autoAnimateUnmatched: true,
    autoAnimateStyles: [
        'opacity',
        'color',
        'background-color',
        'padding',
        'font-size',
        'line-height',
        'letter-spacing',
        'border-width',
        'border-color',
        'border-radius',
        'outline',
        'outline-offset'
    ],
    autoSlide: 0,
    autoSlideStoppable: true,
    autoSlideMethod: null,
    defaultTiming: null,
    mouseWheel: false,
    previewLinks: false,
    postMessage: true,
    postMessageEvents: false,
    focusBodyOnPageVisibilityChange: true,
    width: 1920,
    height: 1080,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    display: 'block',
    hideInactiveCursor: true,
    hideCursorTime: 5000,

    // Plugin configuration
    plugins: []
});

// ============================================
// PRICE COMPARISON CHART
// ============================================

Reveal.on('slidechanged', event => {
    // Chart slide index is 6 (0-indexed from slide 1)
    if (event.indexh === 6) {
        renderPriceChart();
    }
});

function renderPriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;

    // Check if chart already exists and destroy it
    if (window.priceChartInstance) {
        window.priceChartInstance.destroy();
    }

    const data = {
        labels: ['Starbucks Frappuccino', 'Boba Tea RTD', 'Oatly Cold Brew', 'Pistachio Dream'],
        datasets: [{
            label: 'Price per 100ml (USD)',
            data: [0.99, 1.00, 1.30, 1.14],
            backgroundColor: [
                'rgba(0, 112, 74, 0.7)',
                'rgba(255, 107, 157, 0.7)',
                'rgba(92, 138, 165, 0.7)',
                'rgba(147, 172, 143, 0.9)'
            ],
            borderColor: [
                'rgb(0, 112, 74)',
                'rgb(255, 107, 157)',
                'rgb(92, 138, 165)',
                'rgb(107, 130, 102)'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            animation: {
                duration: 1500,
                easing: 'easeOutQuart',
                delay: (context) => {
                    return context.dataIndex * 200;
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 36, 32, 0.95)',
                    titleColor: '#F5F1E8',
                    bodyColor: '#F5F1E8',
                    titleFont: {
                        family: 'Cormorant Garamond',
                        size: 16,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'DM Sans',
                        size: 14
                    },
                    padding: 12,
                    borderColor: 'rgba(147, 172, 143, 0.5)',
                    borderWidth: 1,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return '£' + context.parsed.y.toFixed(2) + ' per 100ml';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.5,
                    ticks: {
                        callback: function(value) {
                            return '£' + value.toFixed(2);
                        },
                        font: {
                            family: 'DM Sans',
                            size: 14
                        },
                        color: '#3A3331'
                    },
                    grid: {
                        color: 'rgba(147, 172, 143, 0.2)',
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Price per 100ml (USD)',
                        font: {
                            family: 'Cormorant Garamond',
                            size: 16,
                            weight: '600'
                        },
                        color: '#58433A'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'DM Sans',
                            size: 13,
                            weight: '500'
                        },
                        color: '#3A3331'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    };

    window.priceChartInstance = new Chart(ctx, config);
}

// ============================================
// INTERACTIVE POSITIONING MAP ENHANCEMENTS
// ============================================

// Add hover effects and click interactions to positioning map dots
document.addEventListener('DOMContentLoaded', () => {
    const competitorDots = document.querySelectorAll('.competitor-dot');
    
    competitorDots.forEach(dot => {
        // Show label on hover
        dot.addEventListener('mouseenter', () => {
            const label = dot.querySelector('.dot-label');
            if (label) {
                label.style.opacity = '1';
            }
        });

        dot.addEventListener('mouseleave', () => {
            const label = dot.querySelector('.dot-label');
            if (label) {
                label.style.opacity = '0';
            }
        });

        // Click to highlight
        dot.addEventListener('click', () => {
            // Remove highlight from all dots
            competitorDots.forEach(d => d.classList.remove('active'));
            // Add highlight to clicked dot
            dot.classList.add('active');
        });
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (event) => {
    // Space bar: Next slide
    if (event.code === 'Space') {
        Reveal.next();
        event.preventDefault();
    }
    
    // Shift + Space: Previous slide
    if (event.shiftKey && event.code === 'Space') {
        Reveal.prev();
        event.preventDefault();
    }
    
    // 'F' key: Toggle fullscreen
    if (event.code === 'KeyF') {
        toggleFullscreen();
    }
    
    // 'O' key: Overview mode
    if (event.code === 'KeyO') {
        Reveal.toggleOverview();
    }
});

// ============================================
// FULLSCREEN TOGGLE
// ============================================

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// ============================================
// ANALYTICS & SLIDE TRACKING (Optional)
// ============================================

Reveal.on('slidechanged', event => {
    console.log(`Navigated to slide ${event.indexh + 1}`);
    
    // Track which slides users spend the most time on
    // This could be connected to analytics tools
});

// ============================================
// CUSTOM ANIMATIONS ON SLIDE TRANSITION
// ============================================

Reveal.on('slidechanged', event => {
    // Reset animations for elements on the current slide
    const currentSlide = event.currentSlide;
    const animatedElements = currentSlide.querySelectorAll('[class*="animation"]');
    
    animatedElements.forEach(element => {
        // Trigger reflow to restart animations
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
    });
});

// ============================================
// MOBILE OPTIMIZATION
// ============================================

// Detect touch devices and adjust interactions
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // On mobile, showing labels permanently might be better
    const competitorDots = document.querySelectorAll('.competitor-dot');
    competitorDots.forEach(dot => {
        const label = dot.querySelector('.dot-label');
        if (label) {
            // Show labels by default on touch devices
            label.style.opacity = '0.8';
        }
    });
}

// ============================================
// PRESENTATION MODE HELPERS
// ============================================

// Log presentation controls to console for reference
console.log(`
╔═══════════════════════════════════════════════════════════╗
║     PISTACHIO DREAM - PRESENTATION CONTROLS               ║
╠═══════════════════════════════════════════════════════════╣
║  Arrow Keys / Space    →  Navigate slides                ║
║  F                     →  Toggle fullscreen               ║
║  O                     →  Overview mode                   ║
║  Esc                   →  Exit overview/fullscreen        ║
║  ?                     →  Show help                       ║
╚═══════════════════════════════════════════════════════════╝
`);

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log when presentation is fully loaded
window.addEventListener('load', () => {
    console.log('✓ Presentation loaded successfully');
    console.log('✓ Reveal.js initialized');
    console.log('✓ Chart.js ready');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (event) => {
    console.error('Presentation error:', event.error);
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
