import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/fmf.png"
              alt="FromyFarm Logo"
              width={50}
              height={50}
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-gray-900">FromyFarm</span>
          </div>
          <div className="text-sm text-gray-600">
            © 2025 FromyFarm. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}