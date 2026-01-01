// components/Footer.tsx - Промени го овој
const Footer = () => (
  <footer className="mt-20 border-t border-gray-200 dark:border-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <div className="h-3 w-3 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
            </div>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              TokenAnalyzer
            </span>
          </div>

          <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-700"></div>

          <div className="text-center sm:text-left">
            <p>Data from public blockchain APIs</p>
            <p className="text-xs mt-1 opacity-75">Not financial advice</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Contact
          </a>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} TokenAnalyzer. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;