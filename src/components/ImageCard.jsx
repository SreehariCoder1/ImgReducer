import React from 'react'
import styles from '../styles/Home.module.css'

export const ImageCard = ({ 
    image, 
    onRemove, 
    targetFormat, 
    targetSize, 
    targetUnit,
    isSelected, 
    onSelect, 
    onDownload 
}) => {
  const originalSize = (image.size / 1024).toFixed(2)
  const originalFormat = image.type.split('/')[1]?.toUpperCase() || 'UNKNOWN'
  
  const displayTargetFormat = targetFormat === 'original' ? originalFormat : targetFormat.split('/')[1]?.toUpperCase()

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
            <div className={styles.selectContainer}>
                <label className={styles.selectLabel}>Select</label>
                <input 
                    type="checkbox" 
                    className={styles.selectBox}
                    checked={isSelected || false}
                    onChange={() => onSelect(image.id)}
                />
            </div>
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
            <div className={styles.detailItem}>
                <span className={styles.detailLabel}>New Size:</span>
                <span className={styles.detailValue}>{targetSize} {targetUnit}</span>
            </div>
            <div className={styles.detailItem}>
                <span className={styles.detailLabel}>New Format:</span>
                <span className={styles.detailValue}>{displayTargetFormat}</span>
            </div>
        </div>

        <button 
            className={styles.cardDownloadBtn} 
            onClick={() => onDownload(image.id)}
            title="Download this image with current settings"
        >
            Download
        </button>
      </div>
    </div>
  )
}
