import { useState, useEffect, useRef, useCallback } from "react"
import styles from "../styles/Home.module.css"
import heic2any from "heic2any"
import { ImageCard } from "./ImageCard"

const MAX_FILES = 20

const Home = () => {
  const [images, setImages] = useState([])
  const [selectedImageIds, setSelectedImageIds] = useState(new Set())
  const [isDragging, setIsDragging] = useState(false)
    const [targetSize, setTargetSize] = useState(100)
  const [targetUnit, setTargetUnit] = useState("KB")
  const [dimensionUnit, setDimensionUnit] = useState("Pixels")
  const [targetFormat, setTargetFormat] = useState("original")
  const [isProcessing, setIsProcessing] = useState(false)
  
  const fileInputRef = useRef(null)
  const dragCounter = useRef(0)
  
  // Helper to update specific property for selected images (or all if none selected)
  const updateImagesSetting = (key, value) => {
      setImages(prevImages => {
          const targets = selectedImageIds.size > 0 
              ? selectedImageIds 
              : new Set(prevImages.map(img => img.id))
          
          return prevImages.map(img => {
              if (targets.has(img.id)) {
                  return { ...img, [key]: value }
              }
              return img
          })
      })
  }

  // Handlers for inputs
  const onSizeChange = (e) => {
      const val = e.target.value
      setTargetSize(val) // Update UI input
      updateImagesSetting('targetSize', val)
  }
  
  const onUnitChange = (e) => {
      const val = e.target.value
      setTargetUnit(val)
      updateImagesSetting('targetUnit', val)
  }

  const onFormatChange = (e) => {
      const val = e.target.value
      setTargetFormat(val)
      updateImagesSetting('targetFormat', val)
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
    // ... (MIME check same) ...
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
    
    // Simulation Helper: Calculate min size for ALL output formats
    const simulateMinSize = async (file, width, height) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)
        await img.decode()
        
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, width, height)
        
        const getBlobSize = async (type, q) => {
            try {
                // Quality 0.0 is the absolute lowest spec-compliant quality
                const blob = await new Promise(resolve => canvas.toBlob(resolve, type, q))
                return blob ? blob.size : 0
            } catch (e) {
                return 0
            }
        }

        // We explicitly calculate 'original' min size by re-compressing at 0.0 with the original MimeType
        // taking care of jpg/jpeg aliasing
        let originalMime = file.type
        if (originalMime === "image/jpg") originalMime = "image/jpeg"

        const results = {
            "image/jpeg": await getBlobSize("image/jpeg", 0.0),
            "image/png": await getBlobSize("image/png", 1.0), 
            "image/webp": await getBlobSize("image/webp", 0.0),
            "image/avif": await getBlobSize("image/avif", 0.0)
        }
        
        // Add original mapping
        if (results[originalMime]) {
            results["original"] = results[originalMime]
        } else {
             // Fallback for types we didn't explicitly check above but are supported (e.g. if we add BMP later)
             results["original"] = await getBlobSize(originalMime, 0.0)
        }
        
        URL.revokeObjectURL(img.src)
        return results
    }

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
            const minBytesCalc = await simulateMinSize(file, details.width, details.height)
            
            newImages.push({
                file,
                url: details.url,
                width: details.width,
                height: details.height,
                name: file.name,
                size: file.size,
                type: file.type,
                id: crypto.randomUUID(),
                minAchievableBytes: minBytesCalc,
                targetSize: targetSize || 100,
                targetUnit: targetUnit || "KB",
                targetFormat: targetFormat || "original"
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
  }, [targetSize, targetUnit, targetFormat]) 

  /* ----------------------------- Cleanup ----------------------------- */
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [])

  /* ----------------------------- Actions ----------------------------- */
  const toggleSelection = (id) => {
    setSelectedImageIds(prev => {
        const newSet = new Set(prev)
        if (newSet.has(id)) {
            newSet.delete(id)
        } else {
            newSet.add(id)
        }
        return newSet
    })
  }

  const removeImage = (id) => {
    setImages(prev => {
        const target = prev.find(i => i.id === id)
        if (target) URL.revokeObjectURL(target.url)
        return prev.filter(i => i.id !== id)
    })
    setSelectedImageIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
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
              error: `Cannot reduce ${imgData.name}:\nTarget: ${tSize} ${tUnit} (= ${targetBytesInt} bytes / ${targetKB} KB)\nExceeds Original: ${imgData.size} bytes / ${originalKB} KB`
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

  const handleReduceSize = async () => {
    setIsProcessing(true)
    
    // Use selected images OR all images
    const imagesToProcess = selectedImageIds.size > 0 
        ? images.filter(img => selectedImageIds.has(img.id))
        : images

    if (imagesToProcess.length === 0) {
         alert("No images to download.")
         setIsProcessing(false)
         return
    }

    let errorMessages = []

    for (const imgData of imagesToProcess) {
        const result = await processAndDownloadImage(imgData)
        if (!result.success) {
            errorMessages.push(result.error)
        }
    }
    
    if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"))
    }

    setIsProcessing(false)
  }

  const handleSingleDownload = async (id) => {
      const img = images.find(i => i.id === id)
      if (!img) return
      
      setIsProcessing(true)
      const result = await processAndDownloadImage(img)
      if (!result.success) {
          alert(result.error)
      }
      setIsProcessing(false)
  }

  // Updated processImageToSize to accept format as arg
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

  // JSX Updates
  return (
    <div className={styles.container}>
      {/* Header same */}
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
          // ... (drag props)
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
                    // Pass individual image settings
                    targetFormat={img.targetFormat || targetFormat}
                    targetSize={img.targetSize || targetSize}
                    targetUnit={img.targetUnit || targetUnit}
                    isSelected={selectedImageIds.has(img.id)}
                    onSelect={toggleSelection}
                    onDownload={handleSingleDownload}
                 />
             ))}
          </div>
        </div>

        </div> 

        {images.length > 0 && (
            <div className={styles.minSizeBox}>
                <h3>Minimum file size to maintain image resolution:</h3>
                <ul>
                    {images.map((img, index) => {
                         let currentFormat = img.targetFormat || targetFormat
                         if (currentFormat === "original") currentFormat = img.type || "image/jpeg"
                         
                         // Handle svg or others by defaulting to jpeg if not in map, or just safe lookup
                         let minSize = img.minAchievableBytes ? img.minAchievableBytes[currentFormat] : 0
                         
                         // Fallback if specific format not found (e.g. svg) or calc failed
                         if (!minSize && img.minAchievableBytes) minSize = img.minAchievableBytes["image/jpeg"] 

                         const formatBytes = (bytes) => {
                            if (bytes === undefined || bytes === null) return 'Calculating...'
                            if (bytes === 0) return '0 B'
                            const k = 1024
                            const sizes = ['B', 'KB', 'MB', 'GB']
                            const i = Math.floor(Math.log(bytes) / Math.log(k))
                            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
                         }
                         
                         return (
                            <li key={img.id}>
                                Image {index + 1}: {formatBytes(minSize)} (for {img.width}x{img.height} px)
                            </li>
                         )
                    })}
                </ul>
            </div>
        )}

        {images.length > 0 && (
            <div className={styles.controls}>
                <div className={styles.inputGroup}>
                    <span style={{marginRight: '10px', fontSize: '1.2rem'}}>Size:</span>
                    <input 
                        type="number" 
                        className={styles.sizeInput} 
                        value={targetSize}
                        onChange={onSizeChange} // Updated handler
                    />
                    <select 
                        className={styles.unitSelect}
                        value={targetUnit}
                        onChange={onUnitChange} // Updated handler
                    >
                        <option value="KB">Kb</option>
                        <option value="MB">Mb</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                   <span style={{marginRight: '10px', fontSize: '1.2rem'}}>Format:</span>
                   <select
                      className={styles.unitSelect}
                      style={{borderRadius: '5px', borderLeft: '1px solid #ccc', backgroundColor: '#f8fafc', color: '#333'}}
                      value={targetFormat}
                      onChange={onFormatChange} // Updated handler
                   >
                      <option value="original">Original</option>
                      <option value="image/jpeg">JPEG</option>
                      <option value="image/png">PNG</option>
                      <option value="image/webp">WEBP</option>
                      <option value="image/avif">AVIF</option>
                   </select>
                </div>
                
                <button 
                    className={styles.reduceBtn} 
                    onClick={handleReduceSize}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Download Selected Image/s'}
                </button>
            </div>
        )}
      </main>
    </div>
  )
}

export default Home
