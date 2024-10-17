import React, { useEffect, useState, } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faArrowRight, 
  faChartLine, 
  faClock, 
  faRocket, 
  faCheckCircle, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faInstagram, 
  faTwitter, 
  faFacebook, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';  // Correct package for social media icons


function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [followers, setFollowers] = useState(0);
  const [scheduledPosts, setScheduledPosts] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: faUsers, title: "Grow Your Audience", description: "AI-powered strategies to expand your reach" },
    { icon: faClock, title: "Save Time", description: "Automate posting across all platforms" },
    { icon: faChartLine, title: "Analyze Performance", description: "Get deep insights into your social media impact" }
  ];

  useEffect(() => {
    const followerInterval = setInterval(() => {
      setFollowers(prev => (prev < 10000 ? prev + 100 : 10000));
    }, 20);

    const postInterval = setInterval(() => {
      setScheduledPosts(prev => (prev < 45 ? prev + 1 : 45));
    }, 50);

    const featureInterval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 5000);

    return () => {
      clearInterval(followerInterval);
      clearInterval(postInterval);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-indigo-600/20 to-transparent dark:from-indigo-600/40 dark:to-gray-900 min-h-screen overflow-hidden">
      <section className="relative py-10 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-900 dark:to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Revolutionize Your
              <span className="relative">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-0 w-full h-3 bg-indigo-500 opacity-50"
                />
                <span className="relative"> Social Media </span>
              </span>
              Presence
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Unify, automate, and skyrocket your social media strategy with our AI-powered platform. Experience growth like never before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 rounded-full text-gray-700 bg-white border-2 border-indigo-300 focus:border-indigo-500 focus:outline-none transition duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
              >
                Start Free Trial
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </motion.button>
            </div>
            <div className="flex gap-4">
              {[faInstagram, faTwitter, faFacebook, faLinkedin].map((icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg"
                >
                  <FontAwesomeIcon icon={icon} className="text-indigo-600 text-xl" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8"
            >
              <img
                src={`/images/2.png`}
                alt="Social Media Dashboard"
                className="h-48 w-full rounded-lg mb-6"
              />
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Your Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400">All your social media in one place</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faChartLine} className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Followers</h4>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{followers.toLocaleString()}+</p>
                </div>
                <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Scheduled Posts</h4>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{scheduledPosts}</p>
                </div>
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={features[currentFeature].icon} className="text-indigo-600 dark:text-indigo-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{features[currentFeature].title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{features[currentFeature].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>

      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 pb-8 text-center" data-aos="fade-up">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-black dark:text-white">
              Why Everyone Loves Our Platform
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Discover how our social media management tool can transform your online presence and drive meaningful results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-16 gap-[30px]">
            <div className="relative" data-aos="fade-right">
              <img
                src={`/images/2.png`}
                className="rounded-lg p-20 "
                alt="Analytics Dashboard"
              />

            </div>
            <div className="lg:ms-8" data-aos="fade-left">
              <h4 className="mb-4 text-2xl leading-normal font-semibold text-black dark:text-white">
                Powerful Analytics <br /> for Data-Driven Decisions
              </h4>
              <p className="text-slate-400">
                Our advanced analytics provide deep insights into your social media performance, allowing you to make informed decisions and optimize your strategy for maximum impact.
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600 mr-2" />
                  Real-time performance tracking
                </li>
                <li className="mb-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600 mr-2" />
                  Audience insights and engagement metrics
                </li>
                <li className="mb-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600 mr-2" />
                  Customizable reports and dashboards
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center"
                >
                  Learn More 
                  <FontAwesomeIcon icon={faChartLine} className="ml-2" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px] mt-16">
            <div className="lg:me-8 order-2 md:order-1" data-aos="fade-right">
              <h4 className="mb-4 text-2xl leading-normal font-semibold text-black dark:text-white">
                Streamlined Content Management
              </h4>
              <p className="text-slate-400">
                Effortlessly plan, create, and schedule your social media content across multiple platforms, ensuring consistent and engaging posts that resonate with your audience.
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600 mr-2" />
                  Intuitive content calendar
                </li>
                <li className="mb-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600 mr-2" />
                  Multi-platform scheduling
                </li>
                <li className="mb-1 flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-indigo-600 mr-2" />
                  Content performance analytics
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center"
                >
                  Explore Features 
                  <FontAwesomeIcon icon={faClock} className="ml-2" />
                </a>
              </div>
            </div>
            <div className="relative order-1 md:order-2" data-aos="fade-left">
              <img
                src={`/images/2.png`}
                className="rounded-lg p-20 "
                alt="Content Calendar"
              />

            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 overflow-hidden ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 pb-8 text-center" data-aos="fade-up">
            <h6 className="text-indigo-600 text-base mb-2">Testimonials</h6>
            <h3 className="mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-black dark:text-white">
              What Our Clients Say
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Discover how our social media management platform has helped businesses like yours achieve remarkable growth and engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 mt-8">
            <Slider {...carouselSettings}>
              {[1, 2, 3].map((index) => (
                <div key={index} className="px-3">
                  <div className="content relative rounded-lg shadow-md dark:shadow-gray-800 m-2 p-6 bg-white dark:bg-slate-900" data-aos="fade-up" data-aos-delay={index * 100}>
                    <FontAwesomeIcon icon={faStar} className="text-amber-400 text-4xl mb-2" />
                    <p className="text-slate-400">
                      "This platform has revolutionized our social media strategy. We've seen a 200% increase in engagement and a significant boost in conversions."
                    </p>
                    <ul className="list-none mb-0 text-amber-400 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <li key={i} className="inline-block"><FontAwesomeIcon icon={faStar} /></li>
                      ))}
                    </ul>
                    <div className="text-center mt-5">
                      <img
                        src={`/api/placeholder/56/56?text=User${index}`}
                        className="h-14 w-14 rounded-full shadow-md mx-auto mb-1"
                        alt={`Testimonial ${index}`}
                      />
                      <h6 className="font-semibold text-black dark:text-white">John Doe</h6>
                      <span className="text-slate-400 text-sm">Marketing Director</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16 bg-indigo-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 text-center">
          <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-white mb-6">
              Ready to Skyrocket Your Social Media Presence?
            </h3>
            <p className="text-white opacity-80 max-w-xl mx-auto mb-8">
              Join thousands of businesses that have transformed their social media strategy with our powerful platform. Start your journey to social media success today!
            </p>
            <div className="subcribe-form mt-6 mb-3">
              <form className="relative max-w-xl mx-auto">
                <input
                  type="email"
                  id="subcribe"
                  name="email"
                  className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800"
                  placeholder="Your Email Address :"
                />
                <button
                  type="submit"
                  className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-indigo-700 hover:bg-indigo-800 border border-indigo-700 hover:border-indigo-800 text-white rounded-full"
                >
                  Get Started <FontAwesomeIcon icon={faRocket} className="ml-1" />
                </button>
              </form>
            </div>
            <p className="text-white opacity-80 mt-3">
              14-day free trial · No credit card required
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 start-0 end-0 hidden sm:block">
          <img src="/api/placeholder/1920/200" alt="footer shape" className="w-full mb-[-2px]" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;