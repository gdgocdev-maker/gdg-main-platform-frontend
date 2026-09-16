"use client"

import PasswordInput from "@/components/auth/PasswordInput"

export default function ResetPasswordForm() {
  return (
    <form className="mt-9 w-full">
      <label
        htmlFor="new-password"
        className="block text-[11px] font-bold"
      >
        New Password
        <PasswordInput
          id="new-password"
          name="new-password"
          placeholder="Enter new password"
          className="mt-1.5 h-8.5 rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>

      <label
        htmlFor="confirm-password"
        className="mt-3 block text-[11px] font-bold"
      >
        Confirm Password <span className="text-red">*</span>
        <PasswordInput
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm new password"
          className="mt-1.5 h-8.5 rounded-md border border-black/15 px-2.75 text-[12px] font-normal outline-none placeholder:text-black/40"
        />
      </label>

      <button
        type="button"
        className="mt-9.5 h-8.75 w-full rounded-[5px] bg-blue text-[12px] font-bold text-white transition-colors duration-200 hover:bg-blue/90 active:bg-blue/80"
      >
        Reset Password
      </button>
    </form>
  )
}
