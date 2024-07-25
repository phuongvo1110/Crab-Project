import Link from "next/link";
import AuthCardTabs from "@app/auth/components/AuthCardTabs";
import Template from "@app/(main)/template";

export default function Login() {
  return (
    <Template>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 overflow-auto sm:h-auto sm:min-h-0 sm:pb-16">
        <h1 className="text-lg font-semibold sm:mt-10">App Authentication</h1>
        <div className="flex h-fit w-fit flex-col gap-2 bg-background sm:w-full sm:px-2">
          <span className="w-auto">
            <Link
              href="/"
              className="group flex items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </Link>
          </span>
          <AuthCardTabs />
        </div>
      </div>
    </Template>
  );
}
