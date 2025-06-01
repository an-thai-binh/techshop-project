export default function BuyCardButton({ className }: { className?: string }) {
  return (
    <button
      className={`${className} rounded-md bg-black/20 px-2 py-1 ring-2 ring-black/10 duration-300 hover:bg-black/10 active:scale-95`}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-sm font-bold">MUA NGAY</h1>
      </div>
    </button>
  )
}
