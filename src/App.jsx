import { useState, useEffect } from 'react'

const TIMER_MODES = {
  FOCUS: { label: '집중 시간! 🔥', time: 25 * 60, color: 'text-cute-focus', bg: 'bg-cute-focus' },
  BREAK: { label: '쉬는 시간~ ☕', time: 5 * 60, color: 'text-cute-break', bg: 'bg-cute-break' },
}

function App() {
  const [mode, setMode] = useState('FOCUS')
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.FOCUS.time)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      if (mode === 'FOCUS') {
        alert("집중 끝! 푹 쉬세요~ 😊")
        setMode('BREAK')
        setTimeLeft(TIMER_MODES.BREAK.time)
      } else {
        alert("쉬는 시간 끝! 다시 달려볼까요? 💪")
        setMode('FOCUS')
        setTimeLeft(TIMER_MODES.FOCUS.time)
      }
      setIsActive(false)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, mode])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(TIMER_MODES[mode].time)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentMode = TIMER_MODES[mode]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <div className="card-glass p-8 md:p-12 w-full max-w-md text-center z-10">
        <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 drop-shadow-sm">
          귀여운 뽀모도로 🍅
        </h1>

        <div className="mb-12 relative group cursor-default">
          <div className={`absolute -inset-1 ${currentMode.bg} rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse`}></div>
          <div className="relative bg-gray-800 rounded-[2rem] p-8 border border-gray-700">
            <div className={`text-xl font-bold mb-2 ${currentMode.color} tracking-wider uppercase`}>
              {currentMode.label}
            </div>
            <div className={`text-7xl font-mono font-bold tracking-tighter ${isActive ? 'text-white' : 'text-gray-400'} transition-colors duration-300`}>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`btn-primary ${isActive ? 'bg-red-500 hover:bg-red-400' : 'bg-indigo-500 hover:bg-indigo-400'}`}
          >
            {isActive ? '그만하기 ⏸️' : '시작하기 ▶️'}
          </button>

          <button
            onClick={resetTimer}
            className="px-6 py-3 rounded-full font-bold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-all duration-300"
          >
            다시하기 🔄
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
          <button
            onClick={() => {
              setMode('FOCUS')
              setIsActive(false)
              setTimeLeft(TIMER_MODES.FOCUS.time)
            }}
            className={`px-4 py-2 rounded-xl transition-all ${mode === 'FOCUS' ? 'bg-white/10 text-white shadow-inner' : 'hover:bg-white/5'}`}
          >
            집중 모드 🔥
          </button>
          <button
            onClick={() => {
              setMode('BREAK')
              setIsActive(false)
              setTimeLeft(TIMER_MODES.BREAK.time)
            }}
            className={`px-4 py-2 rounded-xl transition-all ${mode === 'BREAK' ? 'bg-white/10 text-white shadow-inner' : 'hover:bg-white/5'}`}
          >
            휴식 모드 ☕
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
