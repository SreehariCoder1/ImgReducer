import styles from "../styles/HomeContent.module.css";

const HomeContent = () => {
  return (
    <div className={styles.contentContainer}>
      {/* How to Use Section */}
      <section className={styles.section}>
        <h2>How to Use ImgReducer</h2>
        <p>
          Optimizing your images for the web has never been easier. ImgReducer
          provides a seamless, client-side experience that respects your privacy
          while delivering top-tier compression results. Follow this simple
          guide to get started.
        </p>

        <div className={styles.guideStep}>
          <h3>Step 1: Uploading your images</h3>
          <p>
            To begin, simply drag and drop/paste/click to upload your images
            into the designated drop zone at the top of the page. ImgReducer
            supports a wide variety of formats including JPG, PNG, SVG, WebP,
            AVIF, and even HEIC files from iPhones. You can upload multiple
            files at once for batch processing, making it perfect for
            photographers and developers managing large assets.
          </p>
        </div>

        <div className={styles.guideStep}>
          <h3>Step 2: Choosing compression settings</h3>
          <p>
            Once your images are loaded, you have full control over the output.
            You can choose to compress by
            <strong> Target Filesize</strong> (e.g., "50KB") or by{" "}
            <strong>Quality Percentage</strong>. If you need images for a
            specific platform with strict size limits (like email attachments or
            government portals), simply enter the desired size, and our
            algorithm will iteratively adjust the quality to match it. You can
            easily convert image formats, such as changing a heavy PNG into a
            lightweight WebP, with just one click.
          </p>
        </div>

        <div className={styles.guideStep}>
          <h3>Step 3: Downloading</h3>
          <p>Once you are satisfied with your compression settings:</p>
          <ul>
            <li>
              Click the <strong>Download</strong> button on an image card. the
              button will show "Processing..." while the image is being
              processed.
            </li>
            <li>
              Once processing is successful, the button text will change to
              "Saved".
            </li>
            <li>
              Your image(s) will be automatically downloaded to your system.
            </li>
            <li>Downloaded images will be in the selected size and format.</li>
            <li>
              You can click <strong>Download</strong> on multiple images, they
              will be downloaded one by one in a queue.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <h2>Frequently Asked Questions</h2>

        <div className={styles.faqItem}>
          <h3>Is it safe to use ImgReducer?</h3>
          <p>
            <strong>Yes, absolutely.</strong> Unlike other online tools that
            upload your photos to a remote server for processing, ImgReducer
            runs entirely in your browser using modern WebAssembly technology.
            This means your images never leave your device. You can even
            disconnect from the internet after loading the page, and the tool
            will still work perfectly. Your privacy is our top priority.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3>What image formats are supported?</h3>
          <p>
            We support all modern image formats. You can upload{" "}
            <strong>JPG/JPEG, PNG, WebP, AVIF, SVG, and HEIC</strong>. The tool
            can convert between these formats as well. For example, you can
            convert a batch of HEIC photos from your iPhone directly to JPEG or
            WebP for better compatibility with websites and Windows devices.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3>Does compression reduce image quality?</h3>
          <p>
            It depends on the method you choose.{" "}
            <strong>Lossless compression</strong> reduces file size without
            removing any image data, keeping the quality 100% identical to the
            original. <strong>Lossy compression</strong>
            (which we use for high reduction) intelligently removes data that
            the human eye cannot easily perceive. Our advanced algorithms ensure
            that even with significant size reduction, your images look crisp
            and professional to the naked eye.
          </p>
        </div>

        <div className={styles.faqItem}>
          <h3>Is this tool free?</h3>
          <p>
            Yes, ImgReducer is 100% free to use for both personal and commercial
            projects. There are no hidden fees, watermarks, or daily limits. We
            rely on ads to keep the website running and the tool free for
            everyone.
          </p>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className={styles.section}>
        <h2>Learn About Image Optimization</h2>

        <article className={styles.article}>
          <h3>Why use WebP instead of PNG or JPEG?</h3>
          <p>
            WebP is a modern image format developed by Google that provides
            superior lossless and lossy compression for images on the web. On
            average, WebP images are <strong>26% smaller than PNGs</strong> and
            <strong> 25-34% smaller than comparable JPEGs</strong> at equivalent
            SSIM quality index.
          </p>
          <p>
            Using WebP makes your website load faster, which is a crucial factor
            for SEO (Search Engine Optimization) and user experience. Faster
            sites rank higher in Google search results and have lower bounce
            rates. ImgReducer makes it incredibly easy to modernize your website
            by converting your old library of JPEGs and PNGs into highly
            efficient WebP files.
          </p>
        </article>

        <article className={styles.article}>
          <h3>The difference between Lossy and Lossless compression</h3>
          <p>
            Understanding the difference between these two compression types is
            key to getting the best results.
          </p>
          <p>
            <strong>Lossless compression</strong> allows the original data to be
            perfectly reconstructed from the compressed data. No pixel
            information is lost. This is ideal for archiving images, medical
            imaging, or technical drawings where precision is paramount.
            However, the file size reduction is usually moderate.
          </p>
          <p>
            <strong>Lossy compression</strong> significantly reduces file size
            by permanently eliminating certain information, especially redundant
            data. This is used for standard JPEG and WebP compression. By
            adjusting the "quality" slider, you decide how much data to discard.
            For the web, lossy compression is preferred because it can reduce
            file sizes by up to 90% with very little noticeable difference to
            the user, drastically speeding up page loads.
          </p>
        </article>
      </section>
    </div>
  );
};

export default HomeContent;
