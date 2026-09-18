import Image from "next/image"

type AuthVisualPanelProps = {
  side: "left" | "right"
}

export default function AuthVisualPanel({ side }: AuthVisualPanelProps) {
  const isLeft = side === "left"
  const barPosition = isLeft ? "left-0" : "right-0"
  return (
    <section
      className={`
        hidden relative h-auto w-full flex-col overflow-hidden bg-light-blue px-8.5 pt-8.75 shadow-[0_0_15px_rgba(0,0,0,0.15)] lg:flex lg:h-full lg:w-[48%]
        ${isLeft ? "rounded-tr-[30px]" : "rounded-tl-[30px]"}`}
    >
      <Image
        src="/black-logo-with-colors.svg"
        alt="Google Developer Group on Campus, University of Jeddah"
        width={350}
        height={30}
        priority
      />

      <div className="mt-26">
        <p className="font-mono text-[15px] font-bold tracking-[2px] text-blue">
          GDG ON CAMPUS · UJ
        </p>
        <h1 className="mt-2.25 text-[50px] font-bold leading-[1.08] tracking-[-1.2px]">
          Learn together.
          <span className="block text-blue">Build what’s next.</span>
        </h1>
        <p className="mt-4.25 max-w-95 text-[14px] leading-[1.45]">
          Connect with the community, manage your membership,
          <br />
          and take part in GDG UJ activities
        </p>
      </div>

      <div
        className={`absolute bottom-18 h-6 w-[40%] bg-green ${barPosition}`}
      />
      <div
        className={`absolute bottom-12 h-6 w-[60%] bg-blue ${barPosition}`}
      />
      <div className={`absolute bottom-6 h-6 w-[80%] bg-red ${barPosition}`} />
      <div
        className={`absolute bottom-0 h-6 w-full bg-yellow ${barPosition}`}
      />
    </section>
  )
}
