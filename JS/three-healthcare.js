/**
 * Beyond Pixel - Enhanced 3D "Neural DNA" Visualization
 * Features cinematic particles, neon glows, and a floating data-bridge system.
 */

const initHealthcare3D = () => {
    const container = document.getElementById('three-healthcare-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 12);

    const group = new THREE.Group();
    scene.add(group);

    // --- 1. DNA Strands (High-Density) ---
    const strandCount = 50;
    const strandGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const strandMat1 = new THREE.MeshStandardMaterial({ 
        color: 0x3B82F6, 
        emissive: 0x3B82F6, 
        emissiveIntensity: 0.8,
        roughness: 0,
        metalness: 1
    });
    const strandMat2 = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        emissive: 0xFFFFFF, 
        emissiveIntensity: 0.3,
        roughness: 0,
        metalness: 1
    });

    const helixNodes = [];

    for (let i = 0; i < strandCount; i++) {
        const y = (i / strandCount) * 12 - 6;
        const angle = (i / strandCount) * Math.PI * 5; // Tighter twist
        const radius = 2.2;

        const nodeA = new THREE.Mesh(strandGeo, strandMat1);
        nodeA.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        group.add(nodeA);

        const nodeB = new THREE.Mesh(strandGeo, strandMat2);
        nodeB.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
        group.add(nodeB);

        helixNodes.push({ a: nodeA, b: nodeB, y, angle });
    }

    // --- 2. 13 Growth Bridges (Neon Connectors) ---
    const bridges = [];
    const stageNodeGeo = new THREE.IcosahedronGeometry(0.25, 0);
    
    for (let i = 0; i < 13; i++) {
        const index = Math.floor((i / 13) * strandCount);
        const nodeData = helixNodes[index];

        // Connection line with depth
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodeData.a.position,
            nodeData.b.position
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.6 });
        const line = new THREE.Line(lineGeo, bridgeMat);
        group.add(line);

        // Neon stage node
        const stageNodeMat = new THREE.MeshStandardMaterial({ 
            color: 0xFFFFFF, 
            emissive: 0x3B82F6, 
            emissiveIntensity: 2 
        });
        const stageNode = new THREE.Mesh(stageNodeGeo, stageNodeMat);
        stageNode.position.lerpVectors(nodeData.a.position, nodeData.b.position, 0.5);
        group.add(stageNode);

        bridges.push({ line, node: stageNode, posA: nodeData.a.position.clone(), posB: nodeData.b.position.clone() });
    }

    // --- 3. Tech Dust / Bokeh Particles ---
    const particlesCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({ 
        size: 0.05, 
        color: 0x3B82F6, 
        transparent: true, 
        opacity: 0.6,
        blending: THREE.AdditiveBlending 
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // --- 4. Scanning Beam (Refined) ---
    const beamGeo = new THREE.TorusGeometry(3.5, 0.02, 16, 100);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.2 });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.rotation.x = Math.PI / 2;
    group.add(beam);

    // --- Lighting (Pro Studio) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3B82F6, 15, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x60A5FA, 10, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // --- Animation & Interaction ---
    let mouseX = 0, mouseY = 0;
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - container.clientWidth / 2) * 0.001;
        mouseY = (e.clientY - rect.top - container.clientHeight / 2) * 0.001;
    });

    const clock = new THREE.Clock();
    const animate = () => {
        const time = clock.getElapsedTime();

        // Helix Rotation & Mouse Tilt
        group.rotation.y = time * 0.25;
        group.rotation.x += (mouseY - group.rotation.x) * 0.03;
        group.rotation.z += (mouseX - group.rotation.z) * 0.03;

        // Floating Tech Dust
        particles.rotation.y = -time * 0.05;
        particles.position.y = Math.sin(time * 0.5) * 0.5;

        // Scanning Beam Logic
        beam.position.y = Math.sin(time * 0.7) * 6;
        beam.scale.setScalar(1 + Math.sin(time * 2) * 0.05);

        // Neon Pulse for Stage Bridges
        bridges.forEach((b, i) => {
            const distance = Math.abs(beam.position.y - b.node.position.y);
            if (distance < 0.6) {
                const s = 1.6 + Math.sin(time * 10) * 0.2;
                b.node.scale.set(s, s, s);
                b.node.material.emissiveIntensity = 5;
                b.node.rotation.y += 0.1;
            } else {
                b.node.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
                b.node.material.emissiveIntensity = 1.5;
                b.node.rotation.y += 0.01;
            }
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
};

const checkLibrary = setInterval(() => {
    if (typeof THREE !== 'undefined') {
        initHealthcare3D();
        clearInterval(checkLibrary);
    }
}, 100);
