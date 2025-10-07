import React from 'react'
import '../styles/Home.css'

const background = `${process.env.PUBLIC_URL}/ngoback7.jpg` // 👈 your image in public folder
const background2 = `${process.env.PUBLIC_URL}/nboback2.png`

// Home page content
const HomeContent = {
  hero: {
    title: "Building Bridges, Transforming Lives",
    subtitle:
      "Empowering communities through education, technology, and sustainable development initiatives that create lasting positive change around the world.",
    stats: [
      { label: "Lives Impacted", value: "8K+" },
      { label: "Countries", value: "2" },
      { label: "Project Types", value: "3" },
    ],
    donateCTA: "Donate Now",
  },
  about: {
    heading: "About Us",
    text: "Bridge In The Gap is a nonprofit organization dedicated to transforming lives through the power of education. We proudly serve communities in Winston-Salem, North Carolina, and Ghana, West Africa. Our mission is rooted in the belief that education is not only a fundamental right but also a powerful catalyst for positive social change. Through our programs and initiatives, we strive to provide essential educational resources, support underprivileged students, and empower communities to create lasting change.",
  },
  gapBridger: {
    heading: "Bridge of Hope: Become a Gap Bridger",
    text: "Transform the world—become a Gap Bridger! Our vibrant community of monthly donors, the 'Gap Bridgers,' is at the heart of empowering men, women, and children worldwide to build brighter futures and transform their communities.",
  },
  programsPreview: {
    heading: "What We Do",
    programs: [
      {
        title: "Education",
        text: "Our 'Equipping for a Brighter Tomorrow' project supports students in less privileged communities by providing essential book bags and school supplies.",
      },
      {
        title: "Women Empowerment",
        text: "Our 'Empower Her' program inspires young women to pursue careers in diverse fields and supports menstrual equity through year-round pad distribution.",
      },
      {
        title: "Partnerships",
        text: "We collaborate with Samaritan Ministries, Enhearten Unseen Leaders, and the Fafali Organization to expand our global impact.",
      },
    ],
  },
  impact: {
    heading: "Our Global Impact",
    stats: [
      { label: "Lives Impacted", value: "8,000+" },
      { label: "Countries", value: "2" },
      { label: "High Success Rate", value: "Programs achieve intended outcomes" },
    ],
  },
  shopCTA: {
    heading: "Shop & Support: Custom Shirts Tailored Just for You!",
    text: "At Bridge In The Gap Worldwide, we design and print any kind of shirts—from bold graphic tees and professional polos to event hoodies and custom apparel. 100% of proceeds support our community projects.",
    buttonText: "Get Started",
  },
  contact: {
    email: "info@bridgeinthegap.org",
    phone: "(980) 550-0454",
    address: "Winston-Salem, NC, USA",
    website: "bridgegapworldwide.org",
    social: {
      facebook: "https://www.facebook.com/share/1G7JSjzoqL/",
      instagram: "https://www.instagram.com/bridgeinthegap23?igsh=ZHp6ZmdxdTlseHdj",
      linkedin: "https://www.linkedin.com/company/bridge-in-the-gap-worldwide/",
      youtube: "https://www.youtube.com/channel/UC1234567890",
    },
    donors: ["Enhearten Unseen Leaders", "Wegmans", "Panda Express"],
  },
}

function Home() {
  const { hero, about, gapBridger, programsPreview, impact, shopCTA, contact } = HomeContent

  return (
    <div className='home-body'>
      {/* Hero Section */}
      <section
        className='hero'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.34)), url(${background})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <div className='stats'>
          {hero.stats.map((s, i) => (
            <div key={i} className="stat">
              <strong>{s.value}</strong> 
              {/* FIX APPLIED HERE: Wrap the label text in a span */}
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <button>{hero.donateCTA}</button>
      </section>

      {/* About Section */}
      <section className='about'>
        <h2>{about.heading}</h2>
        <p>{about.text}</p>
      </section>

      {/* Gap Bridger Section */}
      <section className='gap-bridger'>
        <h2>{gapBridger.heading}</h2>
        <p>{gapBridger.text}</p>
      </section>
{/* Programs Preview */}
<section
  className='programs-preview stats2'
  style={{
    // Assuming 'background2' variable contains the URL or path to the image
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${background2})`, 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
>
  
  {/* The H2 title is the first item in the column */}
  <h2>{programsPreview.heading}</h2>

  {/* The Wrapper for Cards: This is the second item in the column, and it manages the row layout */}
  <div className="programs-cards-row">
    {programsPreview.programs.map((p, i) => (
      <div key={i} className='preview-main'> 
        <h3>{p.title}</h3>
        <p>{p.text}</p>
      </div>
    ))}
  </div>
  
</section>

      {/* Global Impact */}
    <section className='impact'>
  <h2>{impact.heading}</h2>
  <div>
    {impact.stats.map((s, i) => (
      <div key={i}>
        <strong>{s.value}</strong>
        <span className="impact-label">{s.label}</span>
      </div>
    ))}
  </div>
</section>

      {/* Shop CTA */}
      <section className='shop-cta'>
        <h2>{shopCTA.heading}</h2>
        <p>{shopCTA.text}</p>
        <button>{shopCTA.buttonText}</button>
      </section>

      {/* Contact */}
      <section className='contact'>
        <h2>Contact Us</h2>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address: {contact.address}</p>
        <p>Website: {contact.website}</p>
        <div className='social'>
          <a href={contact.social.facebook} style={{ textDecoration: 'none' }}>
            Facebook
          </a>
          <a href={contact.social.instagram} style={{ textDecoration: 'none' }}>
            Instagram
          </a>
          <a href={contact.social.linkedin} style={{ textDecoration: 'none' }}>
            LinkedIn
          </a>
            <a href={contact.social.youtube} style={{ textDecoration: 'none' }}>
            Youtube
          </a>
        </div>
        <p>Donors: {contact.donors.join(' • ')}</p>
      </section>
    </div>
  )
}

export default Home