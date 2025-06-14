import { motion } from 'framer-motion';
import { useInView } from './fade-in-on-scroll';
import AboutMe from '../pages/AboutMe';

function AboutMeWrapper() {
  const [ref, isInView] = useInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <AboutMe />
    </motion.div>
  );
}
export default AboutMeWrapper;
