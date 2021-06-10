export default function Loading() {
  return (
    <>
      <div className="flex h-screen justify-center items-center z-10">
        <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24">
          <circle
            className="opacity-20 stroke-current text-purple"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="4"
          ></circle>
          <path
            className="fill-current text-purple"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </>
  );
}
