import SEO from "./SEO";
import styles from "../styles/Legal.module.css";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us - ImgReducer"
        description="About ImgReducer. Our mission is to provide fast, secure, and private image optimization for everyone."
        url="https://www.img-reducer.com/about-us"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>About Us</h1>

          <section>
            <h2>Our Mission</h2>
            <p>
              At ImgReducer, we believe that a faster web is a better web. Large
              images are one of the biggest reasons for slow-loading websites.
              Our mission is to make high-quality image compression accessible,
              free, and secure for everyone—from developers and designers to
              everyday users.
            </p>
          </section>

          <section>
            <h2>Why ImgReducer?</h2>
            <p>
              Most online image converters require you to upload your files to a
              remote server. This is slow, uses bandwidth, and raises privacy
              concerns.
            </p>
            <p>
              <strong>ImgReducer is different.</strong> We built this tool using
              advanced WebAssembly and browser technologies to perform all image
              compression
              <em> directly on your device</em>. Your photos never leave your
              computer or phone.
            </p>
            <ul>
              <li>
                <strong>Speed:</strong> No upload or download time. Processing
                is instant.
              </li>
              <li>
                <strong>Privacy:</strong> Your files stay with you.
              </li>
              <li>
                <strong>Quality:</strong> We use state-of-the-art compression
                algorithms (MozJPEG, PNGQuant, etc.) ported to the browser.
              </li>
            </ul>
          </section>

          <section>
            <h2>The Team</h2>
            <p>
              ImgReducer is a passion project maintained by web performance
              enthusiasts. We are constantly improving our algorithms to support
              the latest formats like AVIF and WebP.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
