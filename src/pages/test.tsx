export default function Page() {
  return (
    <div className="flex bg-gray-100 justify-center">
      <div className="flex flex-col w-full max-w-5xl pb-7">
        <nav className="sticky top-0 flex items-center justify-between bg-gray-700 text-white h-16 z-40 p-2">
          <div className="flex w-1/3">Left</div>
          <div className="flex justify-center  w-1/3">Middle</div>
          <div className="flex justify-end items-center w-1/3 gap-2">Right</div>
        </nav>

        <div className="flex">
          <div className="w-2/3">
            <div className="sticky top-16 w-full h-20 bg-green-500">
              Dont scroll
            </div>
            <div className="w-full h-[2000px] bg-gradient-to-b from-red-300 to-red-800">
              Scroll
            </div>
          </div>
          <div className="w-1/3 h-[calc(100vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain bg-pink-400">
            <div className="h-[1000px]">Scroll independently</div>
          </div>
        </div>

        <footer className="fixed inset-x-0 bottom-0 z-50 bg-gray-700 h-7">
          <div className="flex items-center justify-end px-8 pt-1">
            <div className="text-sm text-white">versionStr</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
