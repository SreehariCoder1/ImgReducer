import SEO from "./SEO";
import styles from "../styles/Legal.module.css";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - ImgReducer"
        description="Privacy Policy for ImgReducer. Learn how we handle your data with 100% client-side processing."
        url="https://www.img-reducer.com/privacy-policy"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Privacy Policy</h1>
          <p className={styles.lastUpdated}>
            Last updated: 16/02/2026
          </p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to ImgReducer. We respect your privacy and are committed
              to protecting your personal data. This privacy policy explains how
              we handle your information when you use our website.
            </p>
          </section>

          <section>
            <h2>2. Data Collection & Processing</h2>
            <p>
              <strong>ImgReducer operates entirely client-side.</strong> This
              means:
            </p>
            <ul>
              <li>Your images are processed locally within your browser.</li>
              <li>
                We do <strong>not</strong> upload your images to any server.
              </li>
              <li>
                We do <strong>not</strong> store or view your images.
              </li>
            </ul>
            <p>
              Once you close the tab or refresh the page, any data related to
              your session is cleared from your browser's memory.
            </p>
          </section>

          <section>
            <h2>3. Cookies and Tracking</h2>
            <p>
              While our tool does not track you, we use third-party services
              that may use cookies:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> We use Google Analytics to
                understand how visitors interact with our website to improve
                user experience. Google Analytics collects anonymous data such
                as page views, session duration, and device type.
              </li>
              <li>
                <strong>Google AdSense:</strong> We display ads provided by
                Google AdSense. Google uses cookies to serve ads based on your
                prior visits to our website or other websites. Google's use of
                advertising cookies enables it and its partners to serve ads to
                you based on your visit to our site and/or other sites on the
                Internet.
              </li>
            </ul>
            <p>
              You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Google Ads Settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2>4. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
