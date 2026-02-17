import SEO from "./SEO";
import styles from "../styles/Legal.module.css";

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service - ImgReducer"
        description="Terms of Service for ImgReducer. Read our conditions of use."
        url="https://www.img-reducer.com/terms-of-service"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Terms of Service</h1>
          <p className={styles.lastUpdated}>
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using ImgReducer, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              ImgReducer is a free tool provided for personal and commercial
              use. You are free to use the output images for any purpose using
              our tool.
            </p>
          </section>

          <section>
            <h2>3. Disclaimer</h2>
            <p>
              The materials on ImgReducer's website are provided on an 'as is'
              basis. ImgReducer makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
            <p>
              Further, since all processing happens locally on your device, we
              are not responsible for any data loss, browser crashes, or
              performance issues that may occur during the use of this tool.
            </p>
          </section>

          <section>
            <h2>4. Limitations</h2>
            <p>
              In no event shall ImgReducer or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on ImgReducer's website.
            </p>
          </section>

          <section>
            <h2>5. Governing Law</h2>
            <p>
              Any claim relating to ImgReducer's website shall be governed by
              the laws of your jurisdiction without regard to its conflict of
              law provisions.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
