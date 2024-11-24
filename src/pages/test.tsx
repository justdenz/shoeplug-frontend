export default function Page() {
  return (
    <div className="h-screen flex">
      <div className="bg-gray-600 w-64">test</div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-scroll"></div>
      </div>
    </div>
  );
}
