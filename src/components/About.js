import React from 'react'
import '../styles/About.css'

const background = `${process.env.PUBLIC_URL}/ngoback5.png`
const pic1 = `${process.env.PUBLIC_URL}/uganda1.png`
const pic2 = `${process.env.PUBLIC_URL}/uganda2.png`
const pic3 = `${process.env.PUBLIC_URL}/uganda3.png`
const pic4 = `${process.env.PUBLIC_URL}/uganda4.png`
const pic5 = `${process.env.PUBLIC_URL}/uganda6.png` 
const pic6 = `${process.env.PUBLIC_URL}/uganda7.png`

const aboutInformation = [
  {
    title: 'Who We Are',
    content: `Bridge In The Gap is a nonprofit organization dedicated to transforming lives through the power of education. We proudly serve communities in Winston-Salem, North Carolina, and Ghana, West Africa. Our mission is rooted in the belief that education is not only a fundamental right but also a powerful catalyst for positive social change. Through our programs and initiatives, we strive to provide essential educational resources, support underprivileged students, and empower communities to create lasting change. Whether it's supplying school materials, supporting educators, or creating opportunities for growth, Bridge In The Gap is committed to building brighter futures—one student, one family, and one community at a time.`
  },
  {
    title: 'Vision',
    content: `Bridge In The Gap Worldwide envisions a world where education is a universal right, a powerful catalyst for positive change, and a bridge to a brighter future for all.`
  },
  {
    title: 'Mission',
    content: `Our mission is to break down educational barriers, foster a love for learning among children and adults, and invest in education as a means to inspire lasting, positive transformation in society.`
  },
  {
    title: 'Our Values',
    type: 'values',
    values: [
      {
        subtitle: 'Mission-Driven',
        text: 'Every initiative is guided by our commitment to creating sustainable, positive change in underserved communities worldwide.'
      },
      {
        subtitle: 'Community-Centered',
        text: 'We work directly with local communities to understand their needs and develop solutions that truly make a difference.'
      },
      {
        subtitle: 'Excellence in Impact',
        text: 'We measure success not just in numbers, but in the lasting transformation we create in the lives we touch.'
      }
    ]
  },
  {
    title: 'A Word From the Founders',
    content: `We are the spark that ignites the flame of change. When we unite around a shared vision and work together, we can create something truly extraordinary. By combining our resources and strengths, we’re building a foundation that will uplift generations through the power of education. Bridge In The Gap Worldwide stands as a beacon of hope—uniting communities, empowering individuals, and breaking down barriers to a brighter future.`
  },
  {
    title: 'Our Partners',
    content: `We proudly partner with organizations such as Samaritan Ministries, Enhearten Unseen Leaders, the Fafali Organization, Wegmans, and Panda Express to expand our global impact and empower communities around the world.`
  },
  {
    title: 'Global Impact',
    type: 'stats',
    stats: [
      { value: '8,000+', label: 'Lives Impacted' },
      { value: '2', label: 'Countries' },
      { value: 'High Success Rate', label: 'Programs achieve their intended outcomes' }
    ]
  }
]

function About() {
  return (
    <div className='about-page-body'>
      {/* Hero Section */}
      <div className='about-hero'
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.66)), url(${background})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h1 className='about-title'>About Us</h1>
        <p className='about-subtitle'>Building Bridges, Transforming Lives</p>
      </div>

      {/* Who We Are Section */}
      <div className='about-page-intro'
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.66)), url(${pic5})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className='about-intro-item'>
          <h2 className='about-intro-title'>{aboutInformation[0].title}</h2>
          <div className='about-card'>
            <div className='about-card-body'>
              <p className='about-card-content'>{aboutInformation[0].content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className='about-page-intro'
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.66)), url(${pic6})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className='about-intro-item'>
          <h2 className='about-intro-title'>{aboutInformation[1].title}</h2>
          <div className='about-card'>
            <div className='about-card-body'>
              <p className='about-card-content'>{aboutInformation[1].content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className='about-page-intro'
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.66)), url(${pic3})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className='about-intro-item'>
          <h2 className='about-intro-title'>{aboutInformation[2].title}</h2>
          <div className='about-card'>
            <div className='about-card-body'>
              <p className='about-card-content'>{aboutInformation[2].content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className='about-page-values'>
        <div className='about-card about-card--values'>
          <div className='about-card-header'>
            <h2 className='about-card-title'>{aboutInformation[3].title}</h2>
          </div>
          <div className='about-card-body'>
            <div className='values-grid'>
              {aboutInformation[3].values.map((value, i) => (
                <div className='value-item' key={i}>
                  <div className='value-header'>
                    <h3 className='value-title'>{value.subtitle}</h3>
                  </div>
                  <p className='value-text'>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* A Word From the Founders Section */}
      <div className='about-page-founders'>
        <div className='about-card'>
          <div className='about-card-header'>
            <h2 className='about-card-title'>{aboutInformation[4].title}</h2>
          </div>
          <div className='about-card-body'>
            <p className='about-card-content'>{aboutInformation[4].content}</p>
          </div>
        </div>
      </div>

      {/* Our Partners Section */}
      <div className='about-page-partners'>
        <div className='about-card'>
          <div className='about-card-header'>
            <h2 className='about-card-title'>{aboutInformation[5].title}</h2>
          </div>
          <div className='about-card-body'>
            <p className='about-card-content'>{aboutInformation[5].content}</p>
          </div>
        </div>
      </div>

      {/* Global Impact Section */}
      <div className='about-page-impact'>
        <div className='about-card about-card--stats'>
          <div className='about-card-header'>
            <h2 className='about-card-title'>{aboutInformation[6].title}</h2>
          </div>
          <div className='about-card-body'>
            <div className='stats-grid'>
              {aboutInformation[6].stats.map((stat, i) => (
                <div className='stat-item' key={i}>
                  <strong className='stat-value'>{stat.value}</strong>
                  <span className='stat-label'>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About