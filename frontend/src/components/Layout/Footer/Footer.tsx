import SecondaryLogo from "@/components/SecondaryLogo";

export default function Footer() {
  return (
    <footer className="flex h-72 w-full flex-col justify-center gap-6 border-t border-t-foreground/10 p-8 text-center text-xs xl:mb-8 xl:h-fit xl:px-6 sm:px-4">
      <div className="flex items-center justify-center">
        <SecondaryLogo />
      </div>
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Crab
        </a>
      </p>
      <p className="mx-auto max-w-[80%] text-justify xl:max-w-full">
        Welcome to Crab, your ultimate companion for convenient and customizable
        transportation solutions. Whether you're navigating the bustling streets
        of the city or embarking on a new adventure, Crab puts the power in your
        hands to craft the perfect ride experience. At Crab, we understand that
        every journey is unique, which is why our user-friendly app empowers you
        to personalize every aspect of your ride. Simply open the app, input
        your destination, and choose from a variety of vehicle types tailored to
        suit your preferences and needs. Whether you prefer the comfort of a
        sedan, the eco-friendliness of a hybrid, or the spaciousness of an SUV,
        Crab has you covered. Join the Crab community today and discover a new
        way to navigate the world around you. With Crab, the journey is not just
        a means of transportation – it's an opportunity to explore, connect, and
        thrive.
      </p>
      <nav className="mx-auto flex w-[80%] flex-row justify-around xl:w-full sm:grid sm:grid-cols-2 sm:gap-3">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Crab community
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Le Hoang Sang
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Vu Dinh Chuong
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Nguyen Quoc Huy
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Vo Pham Thanh Phuong
        </a>
      </nav>
    </footer>
  );
}
