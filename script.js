document.addEventListener('DOMContentLoaded', function() {
    // Killer typing animation for status badge
    const statusText = document.getElementById('statusText');
    const statusMessages = [
        'Building',
        'Processing',
        'Optimizing',
        'Calibrating',
        'Analyzing',
        'Architecting'
    ];
    
    let currentMessageIndex = 0;
    let isTyping = false;
    
    function typeText(text, element, callback) {
        if (isTyping) return;
        isTyping = true;
        
        let index = 0;
        element.textContent = '';
        
        function typeChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 80 + Math.random() * 40); // Slight randomness like human typing
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }
        
        typeChar();
    }
    
    function deleteText(element, callback) {
        if (isTyping) return;
        isTyping = true;
        
        const originalText = element.textContent;
        let index = originalText.length;
        
        function deleteChar() {
            if (index > 0) {
                element.textContent = originalText.substring(0, index - 1);
                index--;
                setTimeout(deleteChar, 50 + Math.random() * 30); // Faster deletion
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }
        
        deleteChar();
    }
    
    function changeStatusMessage() {
        if (isTyping) return;
        
        const nextIndex = (currentMessageIndex + 1) % statusMessages.length;
        const nextMessage = statusMessages[nextIndex];
        
        // Delete current text, then type new text
        deleteText(statusText, () => {
            setTimeout(() => {
                typeText(nextMessage, statusText, () => {
                    currentMessageIndex = nextIndex;
                });
            }, 200); // Brief pause between delete and type
        });
    }
    
    // Start the typing animation cycle
    setTimeout(() => {
        setInterval(changeStatusMessage, 4000);
    }, 2000); // Wait 2 seconds before starting
    
    // Spotless Neural Network Engine
    const neuralNetwork = document.querySelector('.neural-network');
    
    if (neuralNetwork) {
        const networkContainer = neuralNetwork.querySelector('.network-container');
        const svgContainer = neuralNetwork.querySelector('.network-connections');
        
        let allConnections = [];
        let currentConnections = [];
        let isAnimating = false;
        
        // Get actual node positions from DOM
        function getNodePositions() {
            const positions = { input: [], hidden1: [], hidden2: [], output: [] };
            const containerRect = networkContainer.getBoundingClientRect();
            
            document.querySelectorAll('.input-layer .network-node').forEach((node, i) => {
                const rect = node.getBoundingClientRect();
                positions.input.push({
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                    index: i
                });
            });
            
            document.querySelectorAll('.hidden-layer-1 .network-node').forEach((node, i) => {
                const rect = node.getBoundingClientRect();
                positions.hidden1.push({
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                    index: i
                });
            });
            
            document.querySelectorAll('.hidden-layer-2 .network-node').forEach((node, i) => {
                const rect = node.getBoundingClientRect();
                positions.hidden2.push({
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                    index: i
                });
            });
            
            document.querySelectorAll('.output-layer .network-node').forEach((node, i) => {
                const rect = node.getBoundingClientRect();
                positions.output.push({
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2,
                    index: i
                });
            });
            
            return positions;
        }
        
        // Generate all possible connections
        function generateAllConnections() {
            const positions = getNodePositions();
            const connections = [];
            
            // Input to Hidden1
            positions.input.forEach((inputPos, i) => {
                positions.hidden1.forEach((hidden1Pos, j) => {
                    connections.push({
                        from: inputPos,
                        to: hidden1Pos,
                        id: `input-${i}-hidden1-${j}`,
                        strength: Math.random()
                    });
                });
            });
            
            // Hidden1 to Hidden2
            positions.hidden1.forEach((hidden1Pos, i) => {
                positions.hidden2.forEach((hidden2Pos, j) => {
                    connections.push({
                        from: hidden1Pos,
                        to: hidden2Pos,
                        id: `hidden1-${i}-hidden2-${j}`,
                        strength: Math.random()
                    });
                });
            });
            
            // Hidden2 to Output (single output node)
            positions.hidden2.forEach((hidden2Pos, i) => {
                positions.output.forEach((outputPos, j) => {
                    connections.push({
                        from: hidden2Pos,
                        to: outputPos,
                        id: `hidden2-${i}-output-${j}`,
                        strength: Math.random()
                    });
                });
            });
            
            return connections;
        }
        
        // Create SVG line
        function createConnection(connection) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', connection.from.x);
            line.setAttribute('y1', connection.from.y);
            line.setAttribute('x2', connection.to.x);
            line.setAttribute('y2', connection.to.y);
            line.setAttribute('class', 'connection-line');
            line.setAttribute('id', connection.id);
            
            // Visual based on strength
            if (connection.strength > 0.7) {
                line.classList.add('connection-strong');
            } else if (connection.strength > 0.4) {
                line.classList.add('connection-medium');
            } else {
                line.classList.add('connection-weak');
            }
            
            return line;
        }
        
        // Draw connections with natural timing
        function drawConnections(connections, delay = 0) {
            connections.forEach((connection, index) => {
                setTimeout(() => {
                    const line = createConnection(connection);
                    svgContainer.appendChild(line);
                    
                    setTimeout(() => {
                        line.classList.add('connection-drawing');
                    }, 20 + Math.random() * 60);
                }, index * (80 + Math.random() * 120) + delay);
            });
        }
        
        // Erase connections smoothly
        function eraseConnections(connectionIds, callback) {
            const linesToErase = connectionIds.map(id => document.getElementById(id)).filter(line => line);
            
            linesToErase.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('connection-erasing');
                    setTimeout(() => {
                        if (line.parentNode) line.parentNode.removeChild(line);
                    }, 800);
                }, index * 50);
            });
            
            setTimeout(callback, linesToErase.length * 50 + 800);
        }
        
        // Generate smart random pattern with logical flow
        function generateRandomPattern() {
            const density = 0.35 + Math.random() * 0.3; // 35-65% connections
            let selected = allConnections
                .filter(() => Math.random() < density)
                .map(conn => ({ ...conn, strength: Math.random() }));
            
            // Critical: Ensure every node with output has input (except input layer)
            const positions = getNodePositions();
            const inputLayerPositions = new Set(positions.input.map(pos => `${pos.x}-${pos.y}`));
            
            // Track which nodes have outputs and inputs
            const nodesWithOutputs = new Set();
            const nodesWithInputs = new Set();
            
            selected.forEach(conn => {
                nodesWithOutputs.add(`${conn.from.x}-${conn.from.y}`);
                nodesWithInputs.add(`${conn.to.x}-${conn.to.y}`);
            });
            
            // Find nodes that have outputs but no inputs (excluding input layer)
            const orphanedNodes = Array.from(nodesWithOutputs).filter(nodeKey => 
                !nodesWithInputs.has(nodeKey) && !inputLayerPositions.has(nodeKey)
            );
            
            // For each orphaned node, add at least one input connection
            orphanedNodes.forEach(nodeKey => {
                const [x, y] = nodeKey.split('-').map(Number);
                
                // Find all possible input connections for this node
                const possibleInputs = allConnections.filter(conn => 
                    conn.to.x === x && conn.to.y === y
                );
                
                if (possibleInputs.length > 0) {
                    // Add a random input connection
                    const randomInput = possibleInputs[Math.floor(Math.random() * possibleInputs.length)];
                    
                    // Only add if not already selected
                    if (!selected.find(conn => conn.id === randomInput.id)) {
                        selected.push({
                            ...randomInput,
                            strength: 0.4 + Math.random() * 0.6 // Give it decent strength
                        });
                    }
                }
            });
            
            // Ensure output node always has at least one input
            const outputConnections = allConnections.filter(conn => 
                conn.id.includes('output')
            );
            
            const hasOutputConnection = selected.some(conn => 
                conn.id.includes('output')
            );
            
            if (!hasOutputConnection && outputConnections.length > 0) {
                const randomOutput = outputConnections[Math.floor(Math.random() * outputConnections.length)];
                selected.push({ ...randomOutput, strength: 0.5 + Math.random() * 0.5 });
            }
            
            return selected;
        }
        
        // Main animation cycle
        function runAnimationCycle() {
            if (isAnimating) return;
            isAnimating = true;
            
            const iterations = 4 + Math.floor(Math.random() * 4); // 4-7 iterations
            let currentIteration = 0;
            
            function nextIteration() {
                currentIteration++;
                
                // Erase previous if exists
                if (currentConnections.length > 0) {
                    const toErase = currentConnections.map(conn => conn.id);
                    eraseConnections(toErase, () => {
                        if (currentIteration <= iterations) {
                            // Draw new pattern
                            currentConnections = generateRandomPattern();
                            drawConnections(currentConnections, 200);
                            
                            // Schedule next iteration
                            setTimeout(nextIteration, 2800 + Math.random() * 1400);
                        } else {
                            // Cycle complete, pause then restart
                            setTimeout(() => {
                                isAnimating = false;
                                setTimeout(runAnimationCycle, 1500);
                            }, 2000);
                        }
                    });
                } else {
                    // First iteration
                    currentConnections = generateRandomPattern();
                    drawConnections(currentConnections, 0);
                    setTimeout(nextIteration, 2800 + Math.random() * 1400);
                }
            }
            
            nextIteration();
        }
        
        // Initialize
        setTimeout(() => {
            allConnections = generateAllConnections();
            runAnimationCycle();
        }, 800);
        
        // Subtle parallax on mouse move
        neuralNetwork.addEventListener('mousemove', (e) => {
            const rect = neuralNetwork.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const rotateX = (mouseY - centerY) / centerY * 0.3;
            const rotateY = (mouseX - centerX) / centerX * 0.3;
            
            networkContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        neuralNetwork.addEventListener('mouseleave', () => {
            networkContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
        
        // Click to restart
        neuralNetwork.addEventListener('click', () => {
            if (!isAnimating) {
                const allLines = svgContainer.querySelectorAll('line');
                allLines.forEach(line => line.remove());
                currentConnections = [];
                setTimeout(runAnimationCycle, 300);
            }
        });
    }
    
    // Chart line drawing animation trigger
    const chartLine = document.querySelector('.chart-line');
    const chartArea = document.querySelector('.chart-area');
    
    // Trigger animations when page loads
    setTimeout(() => {
        if (chartLine) {
            chartLine.style.strokeDashoffset = '0';
        }
        if (chartArea) {
            setTimeout(() => {
                chartArea.style.opacity = '1';
            }, 1000);
        }
    }, 500);
    
    // Simulate progress bar growth
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '65%';
        }, 1500);
    }
    
    // Add subtle hover effects to the chart
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartContainer.addEventListener('mouseenter', () => {
            chartContainer.style.transform = 'translateY(-2px)';
            chartContainer.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
        });
        
        chartContainer.addEventListener('mouseleave', () => {
            chartContainer.style.transform = 'translateY(0)';
            chartContainer.style.boxShadow = '';
        });
    }
    
    // Performance optimizations
    function optimizeAnimations() {
        // Use CSS transforms for better performance
        const animatedElements = document.querySelectorAll('.chart-line, .chart-area, .progress-fill');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable typing animation for reduced motion
            clearInterval();
            statusText.textContent = 'Building';
            
            // Disable other animations
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }
    }
    
    // Add subtle page entrance animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    optimizeAnimations();
});