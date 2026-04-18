import { useEffect, useState } from "react";
import { Container } from "@/components/primitives/Container";
import { nav } from "@/content/nav";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="91"
      height="24"
      viewBox="0 0 91 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.7016 24C81.6555 24 80.6945 23.8353 79.8187 23.5059C78.9429 23.1529 78.1887 22.6706 77.5562 22.0588C76.948 21.4235 76.4614 20.6588 76.0965 19.7647C75.7559 18.8706 75.5856 17.8706 75.5856 16.7647V8.82353L70.5155 8.83926C68.9585 8.83926 67.7421 9.41166 66.8663 10.2352C66.0148 11.0587 65.5891 12.1764 65.5891 13.5881V19.7646H71.9752V23.647L57.1213 23.647V19.7635H52.7424V16.4116V15.8822H47.9984C46.5545 15.8822 44.7141 16.4831 44.7141 18.2053C44.7141 19.6433 45.9504 20.5633 47.4852 20.6828C50.361 20.9067 51.5093 20.3448 52.2454 19.9846C52.4292 19.8946 52.5872 19.8173 52.7401 19.7679V22.213C50.5953 23.796 49.0565 23.9999 47.2685 23.9999C44.9817 23.9999 43.2544 23.4705 42.0867 22.4116C40.9189 21.3528 40.335 19.9411 40.335 18.1763C40.335 16.4116 40.9432 14.9999 42.1597 13.9411C43.4004 12.8822 45.3466 12.3528 47.9984 12.3528H52.7424V11.4705C52.7424 10.6705 52.4018 9.97635 51.7206 9.38811C51.0394 8.77635 50.1028 8.47047 48.9107 8.47047C47.8889 8.47047 47.0739 8.68223 46.4657 9.10576C45.8819 9.52929 45.5413 9.96459 45.4439 10.4116H41.0649C41.1622 9.6587 41.3812 8.94106 41.7217 8.2587C42.0867 7.55282 42.5854 6.92929 43.2179 6.38811C43.8748 5.84694 44.6898 5.41164 45.6629 5.08223C46.636 4.75282 47.7794 4.58811 49.0932 4.58811C51.6476 4.58811 53.6182 5.23517 55.0049 6.52929C56.4159 7.82341 57.1214 9.52929 57.1214 11.6469V19.7646H61.21V8.82343H57.3783V4.94107H64.1294L64.8592 7.41166H65.4066C65.7715 6.54107 66.3919 5.91754 67.2677 5.54107C68.1435 5.14107 69.0437 4.94107 69.9681 4.94107L75.5856 4.94118L76.3155 0H79.9647V4.94118H87.0806V8.82353H79.9651V4.94142L75.5856 4.94118L75.5859 8.8249H79.9647V16.7647C79.9647 17.9176 80.208 18.7647 80.6945 19.3059C81.2054 19.8471 81.8744 20.1176 82.7016 20.1176C83.5287 20.1176 84.1978 19.9176 84.7086 19.5176C85.2195 19.0941 85.5236 18.3529 85.621 17.2941H90C90 18.3059 89.8175 19.2235 89.4526 20.0471C89.0877 20.8706 88.5768 21.5765 87.92 22.1647C87.2631 22.7529 86.4846 23.2118 85.5845 23.5412C84.7087 23.8471 83.7477 24 82.7016 24ZM27.8878 13.9411L21.8666 4.94107H26.9755L30.1868 10.2352L30.7342 12.1764H31.2816L31.8289 10.2352L35.0038 4.94107H40.1127L34.0915 13.9411L40.4776 23.647H35.3687L31.8289 17.8234L31.2816 15.8822H30.7342L30.1868 17.8234L26.6106 23.647H21.5017L27.8878 13.9411ZM6.00707 22.0587C7.34511 23.3528 9.1089 23.9999 11.2984 23.9999C12.3202 23.9999 13.2568 23.8352 14.1083 23.5058C14.9598 23.1528 15.6653 22.6705 16.2249 22.0587H16.4073L16.7722 23.647H20.6039V4.94107H16.2249V16.2352C16.2249 16.7999 16.1154 17.3293 15.8964 17.8234C15.6775 18.294 15.3855 18.7058 15.0206 19.0587C14.6557 19.3881 14.23 19.647 13.7434 19.8352C13.2568 20.0234 12.7459 20.1175 12.2107 20.1175C11.116 20.1175 10.2037 19.7881 9.47382 19.1293C8.74397 18.447 8.37905 17.4822 8.37905 16.2352V4.94107H4V16.4117C4 18.8822 4.66902 20.7646 6.00707 22.0587Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [onLightFull, setOnLightFull] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const probeY = 48;
    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        '[data-theme="light"]',
      );
      let overAny = false;
      let overFull = false;
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          overAny = true;
          if (el.dataset.themeScope !== "logo") overFull = true;
        }
      });
      setOnLight(overAny);
      setOnLightFull(overFull);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const compact = open || scrolled;
  const showCross = open;
  const showBurger = scrolled && !open;
  const showText = !compact;
  const dark = onLight && !open;
  const darkFull = onLightFull && !open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <Container className="flex h-20 items-center justify-between md:h-24">
          <a
            href="#"
            aria-label="UXART"
            className={`block transition-colors duration-300 ease-[cubic-bezier(.19,1,.22,1)] ${dark ? "text-black" : "text-white"}`}
          >
            <Logo className="h-5 w-auto md:h-6" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className={`relative inline-flex h-11 items-center justify-center overflow-hidden rounded-2xl backdrop-blur-md text-sm font-medium transition-[width,background-color,color] duration-300 ease-[cubic-bezier(.19,1,.22,1)] md:h-12 md:text-base ${
              darkFull
                ? "bg-black/10 text-black hover:bg-black/15"
                : "bg-white/10 text-white hover:bg-white/15"
            } ${compact ? "w-11 md:w-12" : "w-[96px] md:w-[108px]"}`}
          >
            <span
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${showText ? "opacity-100" : "opacity-0"}`}
            >
              Меню
            </span>
            <span
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${showBurger ? "opacity-100" : "opacity-0"}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M5 8h14 M5 16h14" />
              </svg>
            </span>
            <span
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${showCross ? "opacity-100" : "opacity-0"}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6 18 18 M18 6 6 18" />
              </svg>
            </span>
          </button>
        </Container>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-black transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="grid h-full w-full grid-cols-2 pt-20 pb-8 md:pt-24 md:pb-12">
          <div className="flex flex-col justify-end px-6 md:px-10">
            <p
              className={`max-w-xs text-sm text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(.19,1,.22,1)] md:text-base ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              Готовы сделать интернет красивее?{" "}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="underline decoration-white/60 underline-offset-4 hover:decoration-white"
              >
                Давайте поговорим
              </a>
            </p>
          </div>
          <nav className="flex flex-col items-start justify-start gap-0">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-left text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
