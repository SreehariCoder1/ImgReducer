// Image Processing Worker

self.onmessage = async (e) => {
    const { 
        bitmap, 
        width, 
        height, 
        targetBytes, 
        format, 
        mode, 
        fixedQuality = 0.9,
        iterations = 10,
        outputType: explicitFormat
    } = e.data

    try {
        let finalBlob = null
        
        // Determine format
        let outputFormat = explicitFormat || format
        if (outputFormat === 'image/svg+xml') outputFormat = 'image/jpeg'
        // Handle "original"
        if (!outputFormat) outputFormat = 'image/jpeg'

        const isPng = outputFormat === 'image/png'

        // Create OffscreenCanvas
        // We use the bitmap dimensions
        const canvas = new OffscreenCanvas(width, height)
        const ctx = canvas.getContext('2d')
        
        // Helper to draw
        const draw = (w, h) => {
            canvas.width = w
            canvas.height = h
            if (!isPng) {
                ctx.fillStyle = '#FFFFFF'
                ctx.fillRect(0, 0, w, h)
            }
            ctx.drawImage(bitmap, 0, 0, w, h)
        }

        // 1. QUALITY MODE SHORTCUT
        if (mode === 'quality') {
            draw(width, height)
            finalBlob = await canvas.convertToBlob({ type: outputFormat, quality: fixedQuality })
        } else {
            // 2. SIZE MODE (Binary Search)
            
            // Internal Helper for Binary Search
            const findBestQuality = async (w, h) => {
                let minQ = 0.0, maxQ = 1.0
                let bestBlob = null
                const loopIterations = isPng ? 1 : iterations 

                for (let i = 0; i < loopIterations; i++) {
                    let quality = (minQ + maxQ) / 2
                    if (i === 0) quality = 0.92

                    draw(w, h)
                    
                    const blob = await canvas.convertToBlob({ type: outputFormat, quality })
                    
                    if (blob.size <= targetBytes) {
                        bestBlob = blob
                        if (blob.size > targetBytes * 0.998) break 
                        minQ = quality
                    } else {
                        maxQ = quality
                    }
                }
                return bestBlob
            }

            // A. Try original dimensions
            finalBlob = await findBestQuality(width, height)
            
            // B. If failed, scale down dimensions
            if (!finalBlob) {
               let scale = 0.9
               while (scale > 0.05) {
                   const w = Math.floor(width * scale)
                   const h = Math.floor(height * scale)
                   const blob = await findBestQuality(w, h)
                   if (blob) {
                       finalBlob = blob
                       break
                   }
                   scale *= 0.8
               }
            }
        }

        if (!finalBlob) {
             throw new Error("Failed to compress image to target size")
        }

        // Padding (Restored)
        // If result is smaller than target, append null bytes to match exact target
        if (mode === 'size' && finalBlob.size < targetBytes) {
            const deficiency = targetBytes - finalBlob.size
            if (deficiency > 0) {
                const padding = new Uint8Array(deficiency)
                finalBlob = new Blob([finalBlob, padding], { type: finalBlob.type })
            }
        }

        // Send back the blob
        self.postMessage({ success: true, blob: finalBlob })

    } catch (error) {
        self.postMessage({ success: false, error: error.message })
    } finally {
        // Cleanup if possible
        if (bitmap && bitmap.close) bitmap.close()
    }
}
