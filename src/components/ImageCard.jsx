import React from 'react'
import styles from '../styles/Home.module.css'

export const ImageCard = ({ 
    image, 
    onRemove, 
    onUpdate,
    onDownload,
    isProcessing 
}) => {
  const originalSize = (image.size / 1024).toFixed(2)
  const originalFormat = image.type.split('/')[1]?.toUpperCase() || 'UNKNOWN'
  
  // Local handlers for inputs
  const handleSizeChange = (e) => onUpdate(image.id, 'targetSize', e.target.value)
  const handleUnitChange = (e) => onUpdate(image.id, 'targetUnit', e.target.value)
  const handleFormatChange = (e) => onUpdate(image.id, 'targetFormat', e.target.value)

  // Logic to hide/show options
  const isUnsupportedOriginal = image.type === 'image/svg+xml' || image.type === 'image/avif'
  const currentType = image.type 

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
                    <div style={{display:'flex', gap:'2px'}}>
                        <input 
                            type="number" 
                            className={styles.cardInput}
                            value={image.targetSize ?? ''}
                            onChange={handleSizeChange}
                            min="1"
                        />
                        <select 
                            className={styles.cardSelect}
                            value={image.targetUnit || 'KB'}
                            onChange={handleUnitChange}
                        >
                            <option value="KB">KB</option>
                            <option value="MB">MB</option>
                        </select>
                    </div>
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

        <button 
            className={styles.cardDownloadBtn} 
            onClick={() => onDownload(image.id)}
            title="Download this image with current settings"
            disabled={isProcessing}
            style={{opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'wait' : 'pointer'}}
        >
            {isProcessing ? 'Processing....' : 'Download'}
        </button>
      </div>
    </div>
  )
}
