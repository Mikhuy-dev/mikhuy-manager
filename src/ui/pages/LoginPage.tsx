import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F3C8] items-center justify-center px-4 md:px-8 overflow-x-hidden">

      <div className="hidden min-[900px]:flex w-full justify-around items-center">
        <div className="relative flex flex-col items-center justify-center gap-2 w-fit">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-start">
              <img
                src="Mikhuy_text.svg"
                alt="Mikhuy text"
                className="w-full opacity-0 animate-slide-in-img"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            </div>
          ))}
          <img
            src="mikhuy_logo.webp"
            alt="logo"
            className="absolute top-[67%] left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[100%] md:max-w-[320px] lg:max-w-[370px] xl:max-w-[440px]"
          />
        </div>

        <div className="z-30 relative px-5">
          <LoginForm />
        </div>
      </div>

      <div className="min-[900px]:hidden w-full flex justify-center items-center px-4 py-6 overflow-x-hidden">
        <div className="relative w-full max-w-[360px] bg-white/80 backdrop-blur-sm rounded-xl px-6 py-6 flex flex-col items-center justify-center overflow-hidden" style={{ height: 'fit-content', minHeight: '460px' }}>
          <img
            src="mikhuy_logo.webp"
            alt="logo fantasma"
            className="absolute inset-0 m-auto w-56 opacity-90 pointer-events-none z-0 object-contain"
          />
          <div className="relative z-10 w-full flex flex-col justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};