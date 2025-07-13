export default function NextButton({
  text = '다음',
  onClick,
  disabled = false,
  type = 'button',
}: {
  text?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="fixed bottom-10 inset-x-0 rounded-full max-w-[160px] mx-auto bg-black text-white px-6 py-4 hover:bg-black/70 disabled:bg-gray-300"
    >
      {text}
    </button>
  )
}
