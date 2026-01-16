import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ParticleBackground = () => {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Particle system
    const particleCount = 150
    const particles = []
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // ADA colors - muted versions
    const orangeColor = new THREE.Color(0x8B4525) // Muted orange
    const cyanColor = new THREE.Color(0x006B80)   // Muted cyan

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 50

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02
      })

      // Mix orange and cyan particles
      const color = Math.random() > 0.5 ? orangeColor : cyanColor
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create circular particle texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
      const texture = new THREE.CanvasTexture(canvas)
      return texture
    }

    const particleMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: createCircleTexture()
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4A5568,
      transparent: true,
      opacity: 0.08,
      blending: THREE.NormalBlending
    })

    let lineSystem = null

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      const positions = particleGeometry.attributes.position.array

      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i]

        // Drift motion
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Boundary wrapping
        if (Math.abs(particle.x) > 50) particle.vx *= -1
        if (Math.abs(particle.y) > 50) particle.vy *= -1
        if (Math.abs(particle.z) > 25) particle.vz *= -1

        // Mouse interaction - subtle repulsion
        const dx = particle.x - mouseRef.current.x * 30
        const dy = particle.y - mouseRef.current.y * 30
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 15) {
          const force = (15 - distance) / 15
          particle.x += dx * force * 0.02
          particle.y += dy * force * 0.02
        }

        positions[i * 3] = particle.x
        positions[i * 3 + 1] = particle.y
        positions[i * 3 + 2] = particle.z
      }

      particleGeometry.attributes.position.needsUpdate = true

      // Update connection lines
      if (lineSystem) {
        scene.remove(lineSystem)
      }

      const linePositions = []
      const maxDistance = 15

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dz = particles[i].z - particles[j].z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < maxDistance) {
            linePositions.push(particles[i].x, particles[i].y, particles[i].z)
            linePositions.push(particles[j].x, particles[j].y, particles[j].z)
          }
        }
      }

      if (linePositions.length > 0) {
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
        lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial)
        scene.add(lineSystem)
      }

      // Slow rotation
      particleSystem.rotation.y += 0.0002
      particleSystem.rotation.x += 0.0001

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      lineMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

export default ParticleBackground
