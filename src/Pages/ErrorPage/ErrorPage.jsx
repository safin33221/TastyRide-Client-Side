import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated 404 text */}
        <div className="flex justify-center items-end mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
            4
          </h1>
          <div className="relative">
            <div className="absolute -inset-4 bg-pink-500 rounded-full opacity-20 blur-md animate-ping"></div>
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 relative">
              0
            </h1>
          </div>
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 animate-pulse">
            4
          </h1>
        </div>

        {/* Error message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-bounce">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved. Don't
          worry, let's get you back on track!
        </p>

        {/* Animated buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={'/'}>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse">
              Go Back Home
            </button>
          </Link>
        </div>

        {/* Animated broken link illustration */}
        <div className="mt-12 relative h-24 w-full">
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-red-500 rounded-full animate-spin-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-red-300 rounded-full animate-spin-slow-reverse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
