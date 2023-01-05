import * as React from "react"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleComponent = () => {
    const particlesInit = async (main) => {
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
      const particlesLoaded = (container) => {
      };

  return (
<Particles
    className="absolute w-screen h-screen z-1 bg-black"
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    params={{
        fpsLimit: 60,
        fullScreen: { enable: false },
        particles: {
          number: {
            value: 50
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: 400,
            random: {
              enable: true,
              minimumValue: 200
            }
          },
          move: {
            enable: true,
            speed: 10,
            direction: "top",
            outModes: {
              default: "out",
              top: "destroy",
              bottom: "none"
            }
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            resize: true
          }
        },
        style: {
          filter: "blur(50px)"
        },
        detectRetina: true,
        themes: [
          {
            name: "light",
            default: {
              value: true,
              mode: "light"
            },
            options: {
              background: {
                color: "#f7f8ef"
              },
              particles: {
                color: {
                  value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
                }
              }
            }
          },
          {
            name: "dark",
            default: {
              value: true,
              mode: "dark"
            },
            options: {
              background: {
                color: "#000000"
              },
              particles: {
                color: {
                  value: ["#FA00FF", "#FFC700", "#000000", "#6BEB60", "#EB6060"]
                }
              }
            }
          }
        ],
        emitters: {
          direction: "top",
          position: {
            x: 50,
            y: 150
          },
          rate: {
            delay: 0.2,
            quantity: 2
          },
          size: {
            width: 100,
            height: 0
          }
        }
      }} />
    
  );
};

export default ParticleComponent;