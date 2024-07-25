import Image from "next/image";

export default function Profile() {
  return (
    <div className="mx-auto mt-6 flex w-full flex-row items-start justify-center py-4 xl:mt-0">
      <div className="absolute right-3 top-24">
        <Image
          alt="Decor"
          src="/assets/images/home/bg-decor.png"
          width={175}
          height={175}
        />
      </div>
      <div className="absolute bottom-0 left-4">
        <Image
          alt="Decor"
          src="/assets/images/home/bg-decor.png"
          width={175}
          height={175}
        />
      </div>
      <div className="flex h-2/3 w-2/3 gap-4 rounded-xl border p-4 first-letter:bg-gray-100 xl:mx-4 xl:w-full lg:w-full lg:flex-col">
        <div className="flex w-1/2 flex-col items-center justify-center gap-4 lg:w-full">
          <div className="flex h-full w-full items-center justify-center rounded-lg border">
            <div className="relative mx-2 my-2 h-64 w-64">
              <Image
                alt="User Image"
                src="/assets/avt.png"
                layout="fill"
                objectFit="cover"
                quality={100}
              />
            </div>
          </div>
          <div className="mt-2 flex w-full flex-col gap-2">
            <button
              type="submit"
              className="mt-1 w-full rounded-md border bg-background px-4 py-2 text-red-500 hover:bg-red-400 hover:text-background"
            >
              Logout
            </button>
            <button
              type="button"
              className="mt-1 w-full rounded-md border bg-background px-4 py-2 text-foreground hover:bg-foreground hover:text-background"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-1 w-full rounded-md border bg-foreground px-4 py-2 text-background hover:bg-foreground"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center lg:w-full">
          <div className="mb-2 w-full rounded-lg border bg-background p-4">
            <div className="my-4 flex flex-col">
              <label className="mb-2">Full Name</label>
              <input
                placeholder="Full Name"
                type="text"
                className="input-field rounded-lg bg-background text-sm"
              />
            </div>
            <div className="my-4 flex flex-col">
              <label className="mb-2">Email</label>
              <input
                placeholder="Email"
                type="text"
                className="input-field rounded-lg bg-background text-sm"
              />
            </div>
            <div className="my-4 flex flex-col">
              <label className="mb-2">Phone Number</label>
              <input
                placeholder="Numbers Only"
                type="text"
                className="input-field rounded-lg bg-background text-sm"
              />
            </div>
          </div>
          <div className="mt-1 w-full rounded-lg border bg-background p-4">
            <div className="my-4 flex flex-col">
              <label className="mb-2">Password</label>
              <input
                placeholder="Password"
                type="text"
                className="input-field rounded-lg bg-background text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-12 top-32 -rotate-[60deg]">
        <Image
          alt="Decor"
          src="/assets/images/home/bg-decor.png"
          width={175}
          height={175}
        />
      </div>
    </div>
  );
}
