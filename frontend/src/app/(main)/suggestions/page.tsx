"use client";

import Editor from "@/components/editor/advanced-editor";

export default function page() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 px-3 py-4 animate-in">
      <h1 className="my-2 text-3xl font-semibold text-[#028037]">
        AI help you planning your trip
      </h1>
      <div className="w-[80%] overflow-hidden rounded-lg border xl:w-full">
        <Editor initialValue={defaultValue} onChange={() => {}} />
      </div>
    </main>
  );
}

const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Talk about some well-known places in Thành phố Hồ Chí Minh, Việt Nam",
        },
      ],
    },
  ],
};
