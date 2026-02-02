import React from 'react'
import styles from '../styles/Home.module.css'

export const ImageCard = ({ 
    image, 
    onRemove, 
    onUpdate,
    onDownload,
    onCancel,
    isProcessing,
    isSuccess,
    isQueued
}) => {
  const originalSize = (image.size / 1024).toFixed(2)
  const originalFormat = image.type.split('/')[1]?.toUpperCase() || 'UNKNOWN'
  
  // Local handlers for inputs
  const handleSizeChange = (e) => {
      let val = e.target.value
      const currentUnit = image.targetUnit || 'KB'
      
      // Allow empty string to let user clear input
      if (val === '') {
          onUpdate(image.id, 'targetSize', val)
          return
      }

      // Max Check (Strict prevent typing > Max)
      const maxBytes = image.size
      let maxVal = maxBytes / 1024
      if (currentUnit === 'MB') maxVal = maxBytes / (1024 * 1024)

      // Clamping Max
      if (parseFloat(val) > maxVal) {
          val = maxVal.toFixed(currentUnit === 'MB' ? 4 : 2)
      }
      
      onUpdate(image.id, 'targetSize', val)
  }

  // Removed handleBlur and validation on unit change as per request
  
  const handleUnitChange = (e) => {
      const newUnit = e.target.value
      const oldUnit = image.targetUnit || 'KB'
      let val = parseFloat(image.targetSize)
      
      if (!isNaN(val)) {
          if (oldUnit === 'KB' && newUnit === 'MB') {
              val = val / 1024
              onUpdate(image.id, 'targetSize', parseFloat(val.toFixed(4)))
          } else if (oldUnit === 'MB' && newUnit === 'KB') {
              val = val * 1024
              onUpdate(image.id, 'targetSize', parseFloat(val.toFixed(2)))
          }
      }
      onUpdate(image.id, 'targetUnit', newUnit)
  }

  const handleFormatChange = (e) => onUpdate(image.id, 'targetFormat', e.target.value)

  // Logic to hide/show options
  const isUnsupportedOriginal = image.type === 'image/svg+xml' || image.type === 'image/avif'
  const currentType = image.type 

  // Validation
  const targetBytes = (image.targetSize || 0) * ((image.targetUnit || 'KB') === 'KB' ? 1024 : 1024 * 1024)
  const isInvalid = targetBytes < 5120 && (image.targetSize > 0)
  const percentChange = Math.round(((targetBytes - image.size) / image.size) * 100)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <button 
            className={styles.closeBtn} 
            onClick={() => onRemove(image.id)}
            title="Remove image"
        >
            &times;
        </button>
      </div>
      
      <div className={styles.imageContainer}>
        <img src={image.url} alt={image.name} className={styles.cardImage} />
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.infoRow}>
            <div className={styles.fileName} title={image.name}>
                {image.name}
            </div>
            {/* Selection removed */}
        </div>
        
        <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Size:</span>
                <span className={styles.detailValue}>{originalSize} KB</span>
            </div>
            <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Format:</span>
                <span className={styles.detailValue}>{originalFormat}</span>
            </div>
            

            <div className={styles.detailItem} style={{gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                 <div style={{display:'flex', flexDirection:'column'}}>
                    <span className={styles.detailLabel}>New Size:</span>
                    <div style={{display:'flex', gap:'2px', alignItems: 'center'}}>
                        {/* 1. Size Input */}
                        <input 
                            type="number" 
                            className={`${styles.cardInput} ${isInvalid ? styles.inputError : ''}`}
                            value={image.targetSize ?? ''}
                            onChange={handleSizeChange}
                            min={(image.targetUnit || 'KB') === 'KB' ? "5" : "0.005"}
                            step={(image.targetUnit || 'KB') === 'KB' ? "1" : "0.01"}
                            disabled={image.resizeMode === 'quality'}
                            style={image.resizeMode === 'quality' ? {opacity: 0.5, cursor: 'not-allowed'} : {}}
                            title={image.resizeMode === 'quality' ? "Select 'Custom Size' in dropdown to enable editing" : "Target File Size"}
                        />

                        {/* 2. Quality Dropdown (The Bridge) */}
                        <select 
                            className={styles.cardSelect}
                            value={image.resizeMode === 'quality' ? (image.targetQuality || '0.9') : 'custom'}
                            onChange={(e) => {
                                const val = e.target.value
                                if (val === 'custom') {
                                    onUpdate(image.id, 'resizeMode', 'size')
                                } else {
                                    onUpdate(image.id, 'resizeMode', 'quality')
                                    onUpdate(image.id, 'targetQuality', val)
                                }
                            }}
                            style={{minWidth: '90px'}}
                            title="Select Quality Preset or Custom Size"
                        >
                            <option value="custom">Custom Size</option>
                            <option disabled>──────────</option>
                            <option value="max">Max (Original)</option>
                            <option value="0.9">90% of Original</option>
                            <option value="0.8">80% of Original</option>
                            <option value="0.7">70% of Original</option>
                            <option value="0.6">60% of Original</option>
                            <option value="0.5">50% of Original</option>
                            <option value="0.4">40% of Original</option>
                            <option value="0.3">30% of Original</option>
                            <option value="0.2">20% of Original</option>
                            <option value="0.1">10% of Original</option>
                            <option value="min">Min (5KB)</option>
                        </select>

                        {/* 3. Unit Select */}
                        <select 
                            className={styles.cardSelect}
                            value={image.targetUnit || 'KB'}
                            onChange={handleUnitChange}
                            disabled={image.resizeMode === 'quality'}
                            style={image.resizeMode === 'quality' ? {opacity: 0.5} : {}}
                        >
                            <option value="KB">KB</option>
                            <option value="MB">MB</option>
                        </select>
                    </div>

                    {/* Percentage Display */}
                    {(image.resizeMode !== 'quality') && (
                        <span style={{
                            fontSize: '0.75rem', 
                            marginTop: '2px', 
                            color: '#cbd5e1', 
                            whiteSpace: 'nowrap'
                        }}>
                            ({percentChange > 0 ? '+' : ''}{percentChange}%)
                        </span>
                    )}


                 </div>

                 <div style={{display:'flex', flexDirection:'column'}}>
                    <span className={styles.detailLabel}>New Format:</span>
                    <select 
                        className={styles.cardSelect}
                        value={image.targetFormat}
                        onChange={handleFormatChange}
                        style={{width: '100%'}}
                    >
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/png">PNG</option>
                        <option value="image/webp">WEBP</option>
                    </select>
                 </div>
            </div>
        </div>

        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            {(isProcessing || isQueued) && (
                <button
                    className={styles.cardDownloadBtn}
                    onClick={() => onCancel && onCancel(image.id)}
                    title={isQueued ? "Remove from queue" : "Cancel processing"}
                    style={{
                        backgroundColor: '#ef4444', 
                        color: 'white',
                        width: 'auto',
                        padding: '6px 12px',
                        marginTop: '10px'
                    }}
                >
                    Cancel
                </button>
            )}
            <button 
                className={styles.cardDownloadBtn} 
                onClick={() => onDownload(image.id)}
                title="Download this image with current settings"
                disabled={isProcessing || isQueued}
                style={{
                    opacity: (isProcessing || isQueued) ? 0.7 : 1, 
                    cursor: (isProcessing || isQueued) ? 'wait' : 'pointer',
                    backgroundColor: isSuccess ? '#4ade80' : ((isQueued) ? '#eab308' : '#ffffff'), // Yellow for queued
                    color: isSuccess ? '#ffffff' : ((isQueued) ? '#ffffff' : '#3b6c9b'),
                    transition: 'all 0.3s ease'
                }}
            >
                {isProcessing ? 'Processing....' : (isQueued ? 'Queued...' : (isSuccess ? '✓ Saved' : 'Download'))}
            </button>
        </div>
      </div>
    </div>
  )
}
