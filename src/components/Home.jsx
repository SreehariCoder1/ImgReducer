import { useState, useEffect, useRef, useCallback } from "react"
import { Helmet } from "react-helmet-async"
import SEO from "./SEO"
import styles from "../styles/Home.module.css"
import heic2any from "heic2any"
import { ImageCard } from "./ImageCard"
import Features from "./Features"
import ImageWorker from "../workers/image.worker?worker"
import { saveImageToDB, getImagesFromDB, deleteImageFromDB, updateImageInDB } from "../utils/db"

const Home = () => {
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isActive, setIsActive] = useState(false) 
  
  // Mounted flag to prevent strict mode double-load issues if needed, 
  // though simple useEffect([]) is usually fine.
  
    // Load images from DB on mount
    useEffect(() => {
    const loadImages = async () => {
        try {
            const storedImages = await getImagesFromDB()
            if (storedImages && storedImages.length > 0) {
                const EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000 // 24 Hours
                const now = Date.now()
                
                const validImages = []
                
                for (const img of storedImages) {
                    // Check Expiration (with fallback for legacy images without timestamp)
                    if (img.createdAt && (now - img.createdAt > EXPIRATION_TIME_MS)) {
                        // Expired: Delete from DB
                        await deleteImageFromDB(img.id)
                        continue 
                    }
                    
                    // Valid: Recreate URL
                    const url = URL.createObjectURL(img.file)
                    validImages.push({ ...img, url })
                }
                
                setImages(validImages)
            }
        } catch (e) {
            console.error("Failed to load images from DB:", e)
        }
    }
    loadImages()
  }, []) 

  // isProcessing global used for drag/drop loading. 
  // We use processingId for individual downloads.
  const [isProcessing, setIsProcessing] = useState(false)
  // Track multiple processing IDs for concurrent downloads
  const [processingIds, setProcessingIds] = useState(new Set())
  const [queue, setQueue] = useState([])

  const [successIds, setSuccessIds] = useState(new Set())
  const [warningMsg, setWarningMsg] = useState(null)
  
  const fileInputRef = useRef(null)
  const dragCounter = useRef(0)
  const abortControllers = useRef({})
  
  const showToast = useCallback((msg) => {
      setWarningMsg(msg)
      setTimeout(() => setWarningMsg(null), 10000)
  }, [])
  
  // Handler to update specific property for a specific image
  const handleImageUpdate = (id, key, value) => {
      setImages(prevImages => prevImages.map(img => {
          if (img.id === id) {
              const updated = { ...img, [key]: value }

              // Validation Check for Toast (< 5KB)
              if (key === 'targetSize' || key === 'targetUnit') {
                  const tSize = parseFloat(updated.targetSize) || 0
                  const tUnit = updated.targetUnit || "KB"
                  const targetBytes = tSize * (tUnit === "KB" ? 1024 : 1024 * 1024)
                  
                  // Warning if < 5KB (and not empty/0 which happens during typing/clearing)
                  // We check > 0 to allow the user to clear the input without screaming immediately, 
                  // or we can be strict. User said "below 5KB warning".
                  if (targetBytes < 5120 && tSize > 0) {
                      showToast("Target size cannot be less than 5KB.")
                      return updated
                  } 
              }
              
              // Persist update
              updateImageInDB(updated).catch(console.error)
              
              return updated
          }
          return img
      }))
  }

  /* ----------------------------- Helper: Get Image Info ---------------- */
  const getImageDetails = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      const timeout = setTimeout(() => {
        URL.revokeObjectURL(url)
        reject(new Error("Image load timeout - possibly corrupted file"))
      }, 5000)
      
      img.onload = () => {
        clearTimeout(timeout)
        resolve({ width: img.width, height: img.height, url })
      }
      img.onerror = () => {
        clearTimeout(timeout)
        URL.revokeObjectURL(url)
        reject(new Error("Failed to load image"))
      }
      img.src = url
    })
  }

  /* ----------------------------- Helper: Validate by Magic Bytes -------- */
  const validateFileByMagicBytes = async (file) => {
    try {
      const buffer = await file.slice(0, 12).arrayBuffer()
      const view = new Uint8Array(buffer)
      
      // JPG: FF D8 FF
      if (view[0] === 0xFF && view[1] === 0xD8 && view[2] === 0xFF) return true
      
      // PNG: 89 50 4E 47
      if (view[0] === 0x89 && view[1] === 0x50 && view[2] === 0x4E && view[3] === 0x47) return true
      
      // WebP: 52 49 46 46 ... 57 45 42 50 (RIFF...WEBP)
      if (view[0] === 0x52 && view[1] === 0x49 && view[2] === 0x46 && view[3] === 0x46 &&
          view[8] === 0x57 && view[9] === 0x45 && view[10] === 0x42 && view[11] === 0x50) return true
      
      // AVIF: ftyp box at position 4 (more lenient - allows various AVIF encoders)
      if (view[4] === 0x66 && view[5] === 0x74 && view[6] === 0x79 && view[7] === 0x70) return true
      
      // SVG, HEIC, AVIF by extension: Allow by extension (fallback for edge cases)
      const isHeic = file.name.toLowerCase().endsWith(".heic") || file.type === "image/heic"
      const isSvg = file.name.toLowerCase().endsWith(".svg") || file.type === "image/svg+xml"
      const isAvif = file.name.toLowerCase().endsWith(".avif") || file.type === "image/avif"
      
      if (isHeic || isSvg || isAvif) return true
      
      return false
    } catch (e) {
      console.error("Error validating file magic bytes:", e)
      return false
    }
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
    
    const MAX_IMAGES = 10
    
    // 1. Check strict limit
    if (images.length >= MAX_IMAGES) {
        showToast(`You can only upload up to ${MAX_IMAGES} images at a time.`)
        return
    }

    // 2. Filter allowed files
    let validFiles = Array.from(files).filter(f => {
        // 1. Check MIME type
        if (ALLOWED_MIME_TYPES.includes(f.type)) return true
        
        // 2. Check Extension (Fallback for Android/missing MIME)
        const name = f.name.toLowerCase()
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.heic']
        return validExtensions.some(ext => name.endsWith(ext))
    })
    
    if (!validFiles.length) {
        if (files.length > 0) showToast("Only JPG, PNG, WEBP, AVIF, SVG, and HEIC formats are supported.")
        return
    }

    // 3. Trim to fit limit
    const slotsAvailable = MAX_IMAGES - images.length
    if (validFiles.length > slotsAvailable) {
        showToast(`Limit is ${MAX_IMAGES} images. Only adding the first ${slotsAvailable} file(s).`)
        validFiles = validFiles.slice(0, slotsAvailable)
    }

    setIsProcessing(true)
    const newImages = []
    
    // Limits
    const MAX_SIZE_MB = 30
    const MIN_SIZE_KB = 5
    let maxRejectedCount = 0
    let minRejectedCount = 0
    let invalidFormatCount = 0
    let processingErrorCount = 0

    for (let file of validFiles) {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) { maxRejectedCount++; continue }
        if (file.size < MIN_SIZE_KB * 1024) { minRejectedCount++; continue }

        // Validate file by magic bytes to prevent spoofing
        const isValidFormat = await validateFileByMagicBytes(file)
        if (!isValidFormat) { invalidFormatCount++; continue }

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

            // Safe ID generation (Android/older browser compatibility)
            const safeId = Date.now().toString(36) + Math.random().toString(36).substr(2)

            const newImgObj = {
                file,
                url: details.url, // Transient URL, will be regenerated on reload
                width: details.width,
                height: details.height,
                name: file.name,
                size: file.size,
                type: file.type,
                id: safeId,
                targetSize: 100,
                targetUnit: "KB",
                targetFormat: defaultFormat,
                resizeMode: 'size',
                targetQuality: '0.9',
                createdAt: Date.now() // Timestamp for auto-deletion
            }

            newImages.push(newImgObj)
            // Persist to DB
            saveImageToDB(newImgObj).catch(err => console.error("Failed to save image to DB", err))

        } catch (error) {
            console.error("Error processing file:", file.name, error)
            processingErrorCount++
        }
    }
    
    // Alerts
    let alertMsg = ""
    if (maxRejectedCount > 0) alertMsg += `${maxRejectedCount} file(s) skipped > 30MB.\n`
    if (minRejectedCount > 0) alertMsg += `${minRejectedCount} file(s) skipped < 5KB.\n`
    if (invalidFormatCount > 0) alertMsg += `${invalidFormatCount} file(s) skipped - invalid or corrupted format.\n`
    if (processingErrorCount > 0) alertMsg += `${processingErrorCount} file(s) failed to load (unknown error).\n`
    if (alertMsg) showToast(alertMsg)

    setImages(prev => [...prev, ...newImages])
    setIsProcessing(false)
  }, [images]) 

  /* ----------------------------- Cleanup ----------------------------- */
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url))
    }
  }, [])

  // Paste Handler
  useEffect(() => {
    const handlePaste = (e) => {
        if (e.clipboardData && e.clipboardData.files.length > 0) {
            e.preventDefault()
            processFiles(e.clipboardData.files)
        }
    }
    
    window.addEventListener('paste', handlePaste)
    
    // Proper cleanup to prevent listener leaks
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [processFiles])

  // Exiting state for animation
  const [exitingIds, setExitingIds] = useState(new Set())

  /* ----------------------------- Actions ----------------------------- */
  const removeImage = (id) => {
    // 1. Add to exiting state for animation
    setExitingIds(prev => new Set(prev).add(id))

    // 2. Schedule actual removal after animation
    setTimeout(() => {
        // ABORT any ongoing processing for this image
        const controller = abortControllers.current[id]
        if (controller) {
            controller.abort()
            delete abortControllers.current[id]
        }
    
        // Remove from processing state
        setProcessingIds(prev => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    
        // Remove from queue if present
        setQueue(prev => prev.filter(qId => qId !== id))
    
        // Remove from state and cleanup blob URL
        setImages(prev => {
            const target = prev.find(i => i.id === id)
            if (target) URL.revokeObjectURL(target.url)
            deleteImageFromDB(id).catch(console.error)
            return prev.filter(i => i.id !== id)
        })

        // Clear from exitingIds
        setExitingIds(prev => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
    }, 300) // Match CSS transition time
  }

  const processAndDownloadImage = async (imgData, signal) => {
      // Use PER-IMAGE settings
      const tFormat = imgData.targetFormat || "original"
      const mode = imgData.resizeMode || 'size'

      let targetSizeBytes = 0
      let qualityVal = 0.9

      if (mode === 'size') {
          const tSize = imgData.targetSize || 100
          const tUnit = imgData.targetUnit || "KB"
          targetSizeBytes = tSize * (tUnit === "KB" ? 1024 : 1024 * 1024)

          // 1. Min Size Check
          if (targetSizeBytes < 5 * 1024) {
              return { success: false, error: `Skipped ${imgData.name}: Target size < 5KB.` }
          }
          // 2. Max Size Check
          const targetBytesInt = Math.floor(targetSizeBytes)
          if (targetBytesInt > imgData.size) {
            return { success: false, error: `Cannot reduce ${imgData.name}: Target size exceeds original size.` }
          }
      } else {
          // Quality Mode (Now "Relative Size Mode")
          const qStr = imgData.targetQuality || '0.9'
          
          if (qStr === 'min') {
              // MIN: Target 5KB
              targetSizeBytes = 5 * 1024
          } else if (qStr === 'max') {
              // MAX: Original Size
              // If format is same, we return success immediately below
              targetSizeBytes = imgData.size
          } else {
              // Percentage of ORIGINAL SIZE
              const percent = parseFloat(qStr)
              targetSizeBytes = imgData.size * percent
          }

          // MIN safety for relative calculations
          if (targetSizeBytes < 5 * 1024) targetSizeBytes = 5120
      }

      try {
          let processedBlob = null
          
          // Optimization: If Quality Mode = MAX and format matches, use original
          if (mode === 'quality' && imgData.targetQuality === 'max' && tFormat === imgData.type) {
             // Fetch original blob
             const response = await fetch(imgData.url)
             processedBlob = await response.blob()
          } else {
             // Process to target size (Using 'size' mode logic for everything now)
             // We pass 'size' as mode to enforce binary search/resizing to hit targetBytes
             processedBlob = await processImageToSize(imgData, targetSizeBytes, tFormat, signal, 'size')
          }
          
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
          if (e.message === 'Aborted') throw e
          console.error("Reduction failed", e)
          return { success: false, error: `Error reducing ${imgData.name}` }
      }
  }

  const handleSingleDownload = (id) => {
     // If already processing or queued, do nothing
     if (processingIds.has(id) || queue.includes(id)) return
     setQueue(prev => [...prev, id])
  }

  // Effect to process queue
  useEffect(() => {
      const CONCURRENCY_LIMIT = 2
      
      if (processingIds.size < CONCURRENCY_LIMIT && queue.length > 0) {
          const nextId = queue[0]
          setQueue(prev => prev.slice(1)) // Remove from queue
          performDownload(nextId)
      }
  }, [queue, processingIds.size])

  const performDownload = async (id) => {
      const img = images.find(i => i.id === id)
      if (!img) return
      
      const controller = new AbortController()
      abortControllers.current[id] = controller

      setProcessingIds(prev => new Set(prev).add(id))
      
      let result = { success: false }
      try {
        result = await processAndDownloadImage(img, controller.signal)
      } catch (e) {
        if (e.message === 'Aborted') {
            console.log('Download cancelled')
            // Don't alert on cancel
            return 
        }
        result = { success: false, error: e.message }
      } finally {
        // Cleanup controller
        delete abortControllers.current[id]
        // Use functional state update to ensure we have latest state
        setProcessingIds(prev => {
            const next = new Set(prev)
            next.delete(id)
            return next
        })
      }

      if (!result.success) {
          showToast(result.error)
      }

      if (result.success) {
          setSuccessIds(prev => new Set(prev).add(id))
          setTimeout(() => {
              setSuccessIds(prev => {
                  const next = new Set(prev)
                  next.delete(id)
                  return next
              })
          }, 2000)
      }
  }

  const handleCancelDownload = (id) => {
      // 1. If in queue, just remove from queue
      if (queue.includes(id)) {
          setQueue(prev => prev.filter(qId => qId !== id))
          return
      }

      // 2. If processing, abort
      const controller = abortControllers.current[id]
      if (controller) {
          controller.abort()
          delete abortControllers.current[id]
          setProcessingIds(prev => {
              const next = new Set(prev)
              next.delete(id)
              return next
          })
      }
  }

  // Core processing logic
  // Core processing logic
  const processImageToSize = async (imgData, targetBytes, specificFormat, signal, mode = 'size', fixedQuality = 0.9) => {
      // Determine output format
      let outputType = specificFormat
      if (specificFormat === "original") outputType = imgData.type
      if (outputType === "image/svg+xml") outputType = "image/jpeg"
      
      // Check for Worker Support (OffscreenCanvas)
      // Check for Worker Support (OffscreenCanvas)
      if (window.OffscreenCanvas) {
          try {
              const workerBlob = await new Promise(async (resolve, reject) => {
                  const worker = new ImageWorker()
                  
                  // Handle Worker Response
                  worker.onmessage = (e) => {
                      const { success, blob, error } = e.data
                      if (success) resolve(blob)
                      else reject(new Error(error))
                      worker.terminate()
                  }
                  
                  worker.onerror = (e) => {
                      reject(new Error("Worker error: " + e.message))
                      worker.terminate()
                  }

                  // Handle Abort
                  if (signal) {
                      signal.onabort = () => {
                          worker.terminate()
                          reject(new Error("Aborted"))
                      }
                  }

                  // Load Image and Create Bitmap
                  try {
                      const img = new Image()
                      img.src = imgData.url
                      await img.decode()
                      const bitmap = await createImageBitmap(img)
                      
                      // Iterations (passed from user setting/constants)
                      let iterations = 10
                      if (outputType === 'image/png') iterations = 1
                      if (outputType === 'image/webp') iterations = 1

                      // Send to Worker
                      worker.postMessage({
                          bitmap,
                          width: img.width,
                          height: img.height,
                          targetBytes,
                          format: imgData.type,
                          outputType,
                          mode,
                          fixedQuality,
                          iterations
                      }, [bitmap]) // Transfer bitmap for speed
                  } catch (e) {
                      worker.terminate()
                      reject(e)
                  }
              })
              
              return workerBlob
          } catch (e) {
              if (e.message === "Aborted") throw e // Don't fallback if aborted
              console.warn("Worker processing failed, falling back to main thread:", e)
              // Logic continues below to Main Thread Fallback...
          }
      }

      // --- Fallback: Main Thread (If OffscreenCanvas not supported) ---
      const img = new Image()
      img.src = imgData.url
      await img.decode()

      let width = imgData.width
      let height = imgData.height
      
      const isPng = outputType === "image/png"

      if (mode === 'quality') {
           const canvas = document.createElement("canvas")
           canvas.width = width
           canvas.height = height
           const ctx = canvas.getContext("2d")
           if (!isPng) {
               ctx.fillStyle = "#FFFFFF"
               ctx.fillRect(0, 0, width, height)
           }
           ctx.drawImage(img, 0, 0, width, height)
           return new Promise(resolve => canvas.toBlob(resolve, outputType, fixedQuality))
      }

      // Find Best Quality (Main Thread Fallback)
      const findBestQuality = async (w, h) => {
          let minQ = 0.0, maxQ = 1.0
          let bestBlob = null
          
          let iterations = 10 
          if (isPng) iterations = 5
          if (outputType === 'image/webp') iterations = 5

          for (let i = 0; i < iterations; i++) {
              if (signal?.aborted) throw new Error("Aborted")
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
                 // Format mismatch warning suppressed in fallback for brevity
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
      
      // AVIF Check Fallback
      if (!bestBlob && outputType === "image/avif") {
           const canvas = document.createElement("canvas")
           canvas.width = 1; canvas.height = 1;
           const testBlob = await new Promise(r => canvas.toBlob(r, "image/avif", 0.5))
           if (testBlob && testBlob.type !== "image/avif") {
               outputType = "image/jpeg"
               bestBlob = await findBestQuality(width, height)
           }
      }
      
      // 2. Reduce dimensions
      if (!bestBlob) { 
          let scale = 0.9
          while (scale > 0.05) { 
              if (signal?.aborted) throw new Error("Aborted") 
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

      // Padding (Restored)
      if (mode === 'size' && bestBlob && bestBlob.size < targetBytes) {
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
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }, [])

  const onDragOver = useCallback((e) => e.preventDefault(), [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    dragCounter.current = 0
    // Only process if files are being dropped (not text, URLs, etc.)
    if (e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
      processFiles(e.dataTransfer.files)
    }
  }, [processFiles])

  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleMouseDown = useCallback((e) => {
    // Only trigger if clicking directly on dropzone or placeholder, NOT on children (like cards)
    if (e.target.closest(`.${styles.card}`)) return
    setIsActive(true)
  }, [])

  const handleMouseUp = useCallback(() => setIsActive(false), [])

  return (
    <div className={styles.container}>
     <SEO 
  title="ImgReducer | Resize, Compress & Convert Images Online FREE"
  description="Free online image resizer, compressor, and converter. Reduce JPG, PNG, WEBP, HEIC images without losing quality."
  url="https://img-reducer.com"
/>

<Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": "https://img-reducer.com/#webapp",

      "name": "ImgReducer",
      "url": "https://img-reducer.com",
      "description": "Free online image resizer, compressor, and converter.",

      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",

      "creator": {
        "@type": "Organization",
        "name": "ImgReducer",
        "url": "https://img-reducer.com"
      },

      "featureList": [
        "Resize images online",
        "Compress images without quality loss",
        "Convert image formats",
        "Supports JPG, JPEG, PNG, SVG, WEBP, HEIC, and AVIF",
        "Fast and secure browser-based processing",
        "Works on mobile, tablet, and desktop devices"
      ],

      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })}
  </script>
</Helmet>

      <header>
        <div className={styles.header}>
          <img className={styles.logo} src="/favicon.png" alt="icon" />
          <span className={styles.brand}>Img</span>
          <span className={styles.brand_secondary}>Reducer</span>
        </div>
      </header>

      <main>
        <h1 className={styles.title}>Resize Your Images</h1>

        <div className={styles.info}><span>Supported formats: JPG/JPEG, PNG, SVG, WebP, HEIC, AVIF</span><div><span className={styles.info_secondary}>Insert limit: 10 images,</span><span className={styles.info_secondary}>Max: 30MB,</span><span>Min: 5KB</span></div></div>
        
        {warningMsg && (
            <div className={styles.warningToast}>
                {warningMsg}
            </div>
        )}

        <div className={styles.dropZoneContainer}>

        <div className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${isActive ? styles.active : ''}`}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={handleBrowse}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          role="button"
          tabIndex={0}
          aria-label="Upload images dropzone"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBrowse() }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => { processFiles(e.target.files); e.target.value = "" }}
            hidden
            accept="image/png, image/jpeg, image/webp, image/avif, image/svg+xml, .heic"
            multiple
          />
          
          {isProcessing && (
            <div className={styles.loadingOverlay}>
              Loading...
            </div>
          )}

          {images.length === 0 && !isProcessing && (
             <div className={styles.placeholder} onClick={handleBrowse}>
                <img src="/drop-zone_image.png" alt="drop-zone" className={styles.dropZone_Image}/>
                 <p className={styles.dropZoneText}>Load Images</p>
                 <span className={styles.dropZoneTextTwo}>Drag & drop, paste, or click to</span><span className={styles.dropZoneTextThree}>browse</span>
             </div>
          )}

          <div className={styles.grid}>
             {images.map(img => (
                  <div key={img.id} onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                    <ImageCard 
                        image={img} 
                        onRemove={removeImage} 
                        onUpdate={handleImageUpdate}
                        onDownload={handleSingleDownload}
                        onCancel={handleCancelDownload}
                        isProcessing={processingIds.has(img.id)}
                        isQueued={queue.includes(img.id)}
                        isSuccess={successIds.has(img.id)}
                        isExiting={exitingIds.has(img.id)}
                    />
                  </div>
             ))}
          </div>
        </div>

        </div> 
      
      </main>
      <Features />

      <footer>
        <div className={styles.footerContainer}>
        <span className={styles.footerText}>© 2026 ImgReducer. All rights reserved.</span>
        <div>
          <span className={styles.footerText}>imgreducer@gmail.com</span>
        <a href="mailto:imgreducer@gmail.com" className={styles.email}> Email Us</a>
        </div>
        </div>
      </footer>

    </div>
  )
}

export default Home
