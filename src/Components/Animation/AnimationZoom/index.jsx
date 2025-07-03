import { motion } from "framer-motion";

function AnimationZoom ({ children }) {
	return (
	  <motion.div
		initial={{ scale: 0.1, opacity: 0 }} 
		animate={{ scale: 1, opacity: 1 }}
		exit={{scale: 0.1, opacity:0}}  
		transition={{ duration: 0.2, ease: "easeOut" }} 
		className="min-w-[30rem] max-w-[50rem] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
	  >
		{children}
	  </motion.div>
	);
  };

export default AnimationZoom;

  