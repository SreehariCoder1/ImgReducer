import { useState, useEffect, useRef, useCallback } from "react"
import styles from "../styles/Home.module.css"
import heic2any from "heic2any"
import { ImageCard } from "./ImageCard"

const Home = () => {
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  // isProcessing global used for drag/drop loading. 
  // We use processingId for individual downloads.
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingId, setProcessingId] = useState(null)
  
  const fileInputRef = useRef(null)
  const dragCounter = useRef(0)
  
  // Handler to update specific property for a specific image
  const handleImageUpdate = (id, key, value) => {
      setImages(prevImages => prevImages.map(img => {
          if (img.id === id) {
              return { ...img, [key]: value }
          }
          return img
      }))
  }

  /* ----------------------------- Helper: Get Image Info ---------------- */
  const getImageDetails = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        resolve({ width: img.width, height: img.height, url })
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error("Failed to load image"))
      }
      img.src = url
    })
  }

  /* ----------------------------- File Handler ----------------------------- */


  /* ----------------------------- File Handler ----------------------------- */
  const processFiles = useCallback(async (files) => {
    const ALLOWED_MIME_TYPES = [
        "image/jpeg", "image/jpg", 
        "image/png", 
        "image/webp", 
        "image/avif", 
        "image/svg+xml",
        "image/heic"
    ]
    
    const validFiles = Array.from(files).filter(f => {
        const isHeic = f.name.toLowerCase().endsWith(".heic") || f.type === "image/heic"
        const isValidMime = ALLOWED_MIME_TYPES.includes(f.type)
        return isHeic || isValidMime
    })
    
    if (!validFiles.length) {
        if (files.length > 0) alert("Only JPG, PNG, WEBP, AVIF, SVG, and HEIC formats are supported.")
        return
    }

    setIsProcessing(true)
    const newImages = []
    
    // Limits
    const MAX_SIZE_MB = 30
    const MIN_SIZE_KB = 5
    let maxRejectedCount = 0
    let minRejectedCount = 0

    for (let file of validFiles) {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) { maxRejectedCount++; continue }
        if (file.size <= MIN_SIZE_KB * 1024) { minRejectedCount++; continue }

        try {
            // HEIC Conversion
            if (file.name.toLowerCase().endsWith(".heic") || file.type === "image/heic") {
                const blob = await heic2any({ blob: file, toType: "image/jpeg" })
                file = new File([blob], file.name.replace(/\.heic$/i, ".jpg"), { type: "image/jpeg" })
            }

            const details = await getImageDetails(file)
            
            // Determine Default Format
            let defaultFormat = file.type
            // Map jpg -> image/jpeg just in case
            if (defaultFormat === 'image/jpg') defaultFormat = 'image/jpeg'
            
            // For SVG/AVIF, default to JPEG
            if (defaultFormat === 'image/svg+xml' || defaultFormat === 'image/avif') {
                defaultFormat = 'image/jpeg'
            }
            
            newImages.push({
                file,
                url: details.url,
                width: details.width,
                height: details.height,
                name: file.name,
                size: file.size,
                type: file.type,
                id: crypto.randomUUID(),
                targetSize: 100,
                targetUnit: "KB",
                targetFormat: defaultFormat
            })
        } catch (error) {
            console.error("Error processing file:", file.name, error)
        }
    }
    
    // Alerts
    let alertMsg = ""
    if (maxRejectedCount > 0) alertMsg += `${maxRejectedCount} file(s) skipped > 30MB.\n`
    if (minRejectedCount > 0) alertMsg += `${minRejectedCount} file(s) skipped <= 5KB.\n`
    if (alertMsg) alert(alertMsg)

    setImages(prev => [...prev, ...newImages])
    setIsProcessing(false)
  }, []) 

  /* ----------------------------- Cleanup ----------------------------- */
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [])

  /* ----------------------------- Actions ----------------------------- */
  const removeImage = (id) => {
    setImages(prev => {
        const target = prev.find(i => i.id === id)
        if (target) URL.revokeObjectURL(target.url)
        return prev.filter(i => i.id !== id)
    })
  }

  const processAndDownloadImage = async (imgData) => {
      // Use PER-IMAGE settings
      const tSize = imgData.targetSize || 100
      const tUnit = imgData.targetUnit || "KB"
      const tFormat = imgData.targetFormat || "original"

      const targetSizeBytes = tSize * (tUnit === "KB" ? 1024 : 1024 * 1024)

      // 1. Min Size Check
      if (targetSizeBytes < 5 * 1024) {
          return { success: false, error: `Skipped ${imgData.name}: Target size < 5KB.` }
      }

      // 2. Max Size Check (Target > Original)
      const targetBytesInt = Math.floor(targetSizeBytes)
      
      if (targetBytesInt > imgData.size) {
          const targetKB = (targetBytesInt / 1024).toFixed(4)
          const originalKB = (imgData.size / 1024).toFixed(4)
          
          return { 
              success: false, 
              error: `Cannot reduce ${imgData.name}: Target size exceeds original size.`
          }
      }

      try {
          // Pass the image-specific format
          const processedBlob = await processImageToSize(imgData, targetBytesInt, tFormat)
          
          if (!processedBlob) {
              return { success: false, error: `Could not process ${imgData.name}` }
          }

          // Determine extension
          let ext = "jpg"
          if (processedBlob.type === "image/png") ext = "png"
          if (processedBlob.type === "image/webp") ext = "webp"
          if (processedBlob.type === "image/avif") ext = "avif"

          const originalName = imgData.name.substring(0, imgData.name.lastIndexOf('.')) || imgData.name
          downloadBlob(processedBlob, `${originalName}_compressed.${ext}`)
          
          return { success: true }
      } catch (e) {
          console.error("Reduction failed", e)
          return { success: false, error: `Error reducing ${imgData.name}` }
      }
  }

  const handleSingleDownload = async (id) => {
      const img = images.find(i => i.id === id)
      if (!img) return
      
      setProcessingId(id)
      const result = await processAndDownloadImage(img)
      if (!result.success) {
          alert(result.error)
      }
      setProcessingId(null)
  }

  // Core processing logic
  const processImageToSize = async (imgData, targetBytes, specificFormat) => {
      const img = new Image()
      img.src = imgData.url
      await img.decode()

      let width = imgData.width
      let height = imgData.height
      
      // Determine output format based on specific arg
      let outputType = specificFormat
      if (specificFormat === "original") {
          outputType = imgData.type
      }
      if (outputType === "image/svg+xml") outputType = "image/jpeg" 
      
      const isPng = outputType === "image/png"

      // Binary Search Function for Quality
      const findBestQuality = async (w, h) => {
          let minQ = 0.0, maxQ = 1.0
          let bestBlob = null
          const iterations = isPng ? 1 : 30 

          for (let i = 0; i < iterations; i++) {
              let quality = (minQ + maxQ) / 2
              if (i === 0) quality = 0.92
              
              const canvas = document.createElement("canvas")
              canvas.width = w
              canvas.height = h
              const ctx = canvas.getContext("2d")
              if (!isPng) {
                  ctx.fillStyle = "#FFFFFF"
                  ctx.fillRect(0, 0, w, h)
              }
              ctx.drawImage(img, 0, 0, w, h)

              const blob = await new Promise(resolve => canvas.toBlob(resolve, outputType, quality))

              if (!blob) break 
              
              if (blob.type !== outputType && outputType !== 'image/png') {
                  return null 
              }

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

      // 1. Try with original dimensions
      let bestBlob = await findBestQuality(width, height)
      
      if (!bestBlob && outputType === "image/avif") {
           const canvas = document.createElement("canvas")
           canvas.width = 1; canvas.height = 1;
           const testBlob = await new Promise(r => canvas.toBlob(r, "image/avif", 0.5))
           if (testBlob && testBlob.type !== "image/avif") {
               console.warn("AVIF encoding not supported, falling back to JPEG")
               outputType = "image/jpeg"
               bestBlob = await findBestQuality(width, height)
           }
      }
      
      // 2. If it still doesn't fit, reduce dimensions loop
      if (!bestBlob) { 
          let scale = 0.9
          while (scale > 0.05) { 
              const w = Math.floor(width * scale)
              const h = Math.floor(height * scale)
              
              const blob = await findBestQuality(w, h)
              if (blob) {
                  bestBlob = blob
                  break
              }
              scale *= 0.8 
          }
      }

      // Padding
      if (bestBlob && bestBlob.size < targetBytes) {
          const deficiency = targetBytes - bestBlob.size
          const padding = new Uint8Array(deficiency)
          bestBlob = new Blob([bestBlob, padding], { type: bestBlob.type })
      }

      return bestBlob
  }

  const downloadBlob = (blob, filename) => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
  }

  /* ----------------------------- Drag Events ----------------------------- */
  const onDragEnter = useCallback((e) => {
    e.preventDefault()
    dragCounter.current += 1
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    e.preventDefault()
    dragCounter.current -= 1
    if (dragCounter.current === 0) setIsDragging(false)
  }, [])

  const onDragOver = useCallback((e) => e.preventDefault(), [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    dragCounter.current = 0
    processFiles(e.dataTransfer.files)
  }, [processFiles])

  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.header}>
          <img className={styles.logo} src="/favicon.png" alt="icon" />
          <span className={styles.brand}>Img</span>
          <span className={styles.brand_secondary}>Reducer</span>
        </div>
      </header>

      <main>
        <h1 className={styles.title}>Resize Your Images</h1>
        
        <div style={{position: 'relative', marginTop:'40px'}}>

        <div
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => { processFiles(e.target.files); e.target.value = "" }}
            hidden
            accept="image/png, image/jpeg, image/webp, image/avif, image/svg+xml, .heic"
            multiple
          />
          
          {images.length === 0 && (
             <div className={styles.placeholder} onClick={handleBrowse} style={{cursor: 'pointer'}}>
                 <p style={{fontSize: '1.2rem', color: '#8892b0'}}>Load Images</p>
                 <p style={{fontSize: '0.9rem'}}>Drag & Drop or Click to Browse</p>
             </div>
          )}

          <div className={styles.grid}>
             {images.map(img => (
                 <ImageCard 
                    key={img.id} 
                    image={img} 
                    onRemove={removeImage} 
                    onUpdate={handleImageUpdate}
                    onDownload={handleSingleDownload}
                    isProcessing={processingId === img.id}
                 />
             ))}
          </div>
        </div>

        </div> 
        {/* Global Controls Removed */}
      </main>
    </div>
  )
}

export default Home
