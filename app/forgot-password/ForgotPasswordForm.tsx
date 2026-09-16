"use client"


export default function ForgotPasswordForm() {


  return (
    <form
      className="mt-17.5 w-full"
    >
      <label
        htmlFor="email"
        className="block text-[12px] font-bold"
      >
        Email address <span className="text-red">*</span>
      </label>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
        className="mt-1.5 h-9 w-full rounded-md border border-black/15 px-2.75 text-[12px] outline-none placeholder:text-black/40"
      />

      <button
        type="submit"
        className="mt-7 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
      >
        Send Code
      </button>
    </form>
  )
}