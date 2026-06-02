import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'GitHub', href: '#' },
];

export default function Contact() {
  return (
    <motion.div 
      className="contact-page section-padding"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="contact-page__container">
        <div className="contact-page__header">
          <div className="contact-page__portrait-mini">
             <img src="/portrait.png?v=2" alt="Nijal" style={{ width: '80px', height: '80px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }} />
          </div>
          <h1 className="page-heading">Let's start a <br/>project together</h1>
        </div>

        <div className="contact-page__content">
          <form className="contact-form">
            <div className="form-group">
              <label>01</label>
              <div className="form-input-wrap">
                <span>What's your name?</span>
                <input type="text" placeholder="John Doe *" required />
              </div>
            </div>
            <div className="form-group">
              <label>02</label>
              <div className="form-input-wrap">
                <span>What's your email?</span>
                <input type="email" placeholder="john@doe.com *" required />
              </div>
            </div>
            <div className="form-group">
              <label>03</label>
              <div className="form-input-wrap">
                <span>What's the name of your organization?</span>
                <input type="text" placeholder="Organization name" />
              </div>
            </div>
            <div className="form-group">
              <label>04</label>
              <div className="form-input-wrap">
                <span>What service are you looking for?</span>
                <input type="text" placeholder="Design, Development..." />
              </div>
            </div>
            <div className="form-group">
              <label>05</label>
              <div className="form-input-wrap">
                <span>Your message</span>
                <textarea placeholder="Hello Nijal, can you help me with... *" required />
              </div>
            </div>

            <div className="form-submit">
              <Magnetic strength={0.3}>
                <button type="submit" className="contact-btn">Send Message</button>
              </Magnetic>
            </div>
          </form>

          <aside className="contact-sidebar">
            <div className="contact-details">
              <h4>Contact Details</h4>
              <p>hello@nijaltamrakar.com</p>
              <p>+977 98XXXXXXXX</p>
            </div>
            <div className="contact-socials">
              <h4>Socials</h4>
              <ul>
                {socialLinks.map(link => (
                  <li key={link.label}>
                    <Magnetic strength={0.1}>
                      <a href={link.href}>{link.label}</a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
