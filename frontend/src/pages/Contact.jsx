
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('Your message has been sent successfully!');

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      setStatus(error.message || 'Unable to send message.');
    }
  };

  return (
    <div className="restaurant-contact">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

        .restaurant-contact {
          font-family: 'DM Sans', sans-serif;
          color: #252525;
          background: #fff;
          width: 100%;
        }

        .restaurant-contact * {
          box-sizing: border-box;
        }

        /* HERO SECTION */

        .contact-hero {
          min-height: 420px;
          background:
            linear-gradient(rgba(0,0,0,.58),rgba(0,0,0,.65)),
            url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85')
            center/cover no-repeat;

          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 50px 20px;
          color: white;
        }

        .contact-hero-content {
          max-width: 700px;
        }

        .contact-hero small,
        .contact-label {
          color: #d69b43;
          letter-spacing: 3px;
          font-weight: 700;
          font-size: 12px;
        }

        .contact-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(45px, 7vw, 75px);
          margin: 20px 0;
        }

        .contact-hero h1 span,
        .contact-info h2 span {
          color: #d69b43;
        }

        .contact-hero p {
          color: #eee;
          line-height: 1.8;
          font-size: 16px;
        }

        /* MAIN CONTACT */

        .contact-main {
          max-width: 1200px;
          margin: auto;
          padding: 90px 25px;

          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 65px;
        }

        .contact-info h2,
        .contact-form h2,
        .contact-map h2 {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          margin: 15px 0;
        }

        .contact-description {
          color: #777;
          line-height: 1.8;
          margin-bottom: 35px;
        }

        /* CONTACT DETAILS */

        .contact-info-item {
          display: flex;
          gap: 16px;
          margin: 25px 0;
          align-items: flex-start;
        }

        .contact-icon {
          min-width: 48px;
          height: 48px;
          background: #fff5e7;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 21px;
        }

        .contact-info-item h3 {
          font-size: 16px;
          margin: 3px 0 8px;
        }

        .contact-info-item p {
          color: #777;
          font-size: 14px;
          margin: 5px 0;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .contact-info-item a {
          color: #777;
          text-decoration: none;
          transition: .3s;
        }

        .contact-info-item a:hover {
          color: #bd8436;
        }

        /* SOCIAL LINKS */

        .contact-socials {
          display: flex;
          gap: 20px;
          margin-top: 30px;
        }

        .contact-socials a {
          color: #bd8436;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }

        /* CONTACT FORM */

        .contact-form {
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 45px rgba(0,0,0,.08);
          background: #fff;
        }

        .contact-form h2 {
          font-size: 30px;
        }

        .contact-form > p {
          color: #888;
          font-size: 14px;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .contact-field label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .contact-field input,
        .contact-field textarea {
          width: 100%;
          padding: 15px;
          border: 1px solid #e5e5e5;
          background: #fafafa;
          border-radius: 5px;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          transition: .3s;
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: #bd8436;
          background: white;
          box-shadow: 0 0 0 3px rgba(189,132,54,.1);
        }

        .contact-field textarea {
          resize: vertical;
        }

        .contact-button {
          width: 100%;
          padding: 16px;
          background: #bd8436;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: .3s;
        }

        .contact-button:hover {
          background: #222;
        }

        .contact-status {
          margin-top: 15px;
          font-size: 14px;
          color: #39804c;
        }

        /* IMAGE BANNER */

        .contact-banner {
          min-height: 320px;

          background:
            linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),
            url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85')
            center/cover no-repeat;

          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 40px 20px;
        }

        .contact-banner small {
          color: #e0a54e;
          letter-spacing: 3px;
          font-weight: 700;
        }

        .contact-banner h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 48px);
          margin: 20px 0;
        }

        .contact-banner p {
          color: #eee;
        }

        /* GOOGLE MAP */

        .contact-map {
          text-align: center;
          padding-top: 75px;
        }

        .contact-map h2 {
          margin-bottom: 0;
        }

        .contact-map iframe {
          display: block;
          margin-top: 30px;
        }

        /* RESPONSIVE DESIGN */

        @media(max-width: 850px) {
          .contact-main {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 20px;
          }
        }

        @media(max-width: 550px) {
          .contact-hero {
            min-height: 340px;
          }

          .contact-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .contact-form {
            padding: 25px 18px;
          }

          .contact-info h2 {
            font-size: 30px;
          }

          .contact-form h2 {
            font-size: 26px;
          }

          .contact-map iframe {
            height: 280px;
          }
        }
      `}</style>

      {/* HERO SECTION */}

      <section className="contact-hero">
        <div className="contact-hero-content">
          <small>WE WOULD LOVE TO HEAR FROM YOU</small>

          <h1>
            Get In <span>Touch</span>
          </h1>

          <p>
            Have a question, suggestion or want to make a
            reservation? We're always here for you.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS AND FORM */}

      <section className="contact-main">

        <div className="contact-info">

          <span className="contact-label">CONTACT US</span>

          <h2>
            Let's Start a <span>Conversation</span>
          </h2>

          <p className="contact-description">
            Whether it's about our menu, reservations or
            special events, feel free to contact us.
          </p>

          {/* LOCATION */}

          <div className="contact-info-item">
            <div className="contact-icon">📍</div>

            <div>
              <h3>Our Location</h3>
              <p>
                Double Storey, Govindpuri, Modinagar,
                Ghaziabad
              </p>
            </div>
          </div>

          {/* PHONE */}

          <div className="contact-info-item">
            <div className="contact-icon">📞</div>

            <div>
              <h3>Phone Number</h3>
              <p>
                <a href="tel:7037960416">
                  7037960416
                </a>
              </p>
            </div>
          </div>

          {/* EMAIL */}

          <div className="contact-info-item">
            <div className="contact-icon">✉️</div>

            <div>
              <h3>Email Address</h3>
              <p>
                <a href="mailto:mscoding1907@gmail.com">
                  mscoding1907@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* OPENING HOURS */}

          <div className="contact-info-item">
            <div className="contact-icon">🕒</div>

            <div>
              <h3>Opening Hours</h3>
              <p>Monday - Sunday</p>
              <p>11:00 AM - 11:00 PM</p>
            </div>
          </div>

          {/* SOCIAL LINKS */}

          <div className="contact-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>

        </div>

        {/* CONTACT FORM */}

        <div className="contact-form">

          <span className="contact-label">
            SEND A MESSAGE
          </span>

          <h2>We'd Love to Hear From You</h2>

          <p>
            Fill out the form below and we'll get back to you.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="contact-row">

              <div className="contact-field">
                <label>Your Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="contact-row">

              <div className="contact-field">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label>Subject</label>

                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="contact-field">
              <label>Your Message</label>

              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-button"
            >
              Send Message →
            </button>

            {status && (
              <div className="contact-status">
                {status}
              </div>
            )}

          </form>
        </div>

      </section>

      {/* RESTAURANT BANNER */}

      <section className="contact-banner">
        <div>
          <small>GOOD FOOD. GREAT MOMENTS.</small>

          <h2>
            We Can't Wait to Welcome You!
          </h2>

          <p>Come hungry, leave happy.</p>
        </div>
      </section>

      {/* GOOGLE MAP LOCATION */}

      <section className="contact-map">

        <span className="contact-label">
          FIND US
        </span>

        <h2>Visit Our Restaurant</h2>

        <iframe
          title="Restaurant Location"
          src="https://www.google.com/maps?q=Double%20Storey%2C%20Govindpuri%2C%20Modinagar%2C%20Ghaziabad&output=embed"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </section>

    </div>
  );
};

export default Contact;
