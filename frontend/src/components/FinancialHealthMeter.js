import { motion } from "framer-motion";

function FinancialHealthMeter({ score = 0 }) {

  const healthColor =
    score >= 70
      ? "text-emerald-400"
      : score >= 40
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="neon-card p-6 flex flex-col items-center justify-center"
    >

      <h3 className="font-semibold text-purple-300 mb-5">
        ❤️ Financial Health Score
      </h3>

      <div className="relative w-40 h-40">

        <svg className="w-full h-full transform -rotate-90">

          {/* Background Ring */}
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="rgba(168,85,247,0.15)"
            strokeWidth="12"
            fill="transparent"
          />

          {/* Progress Ring */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke="url(#grad)"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray="440"
            initial={{ strokeDashoffset: 440 }}
            animate={{
              strokeDashoffset:
                440 - (440 * score) / 100
            }}
            transition={{ duration: 1.5 }}
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

        </svg>

        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-3xl font-bold ${healthColor}`}
          >
            {score}
          </motion.span>

          <span className="text-purple-400 text-sm">
            / 100
          </span>

        </div>

      </div>

    </motion.div>
  );
}

export default FinancialHealthMeter;