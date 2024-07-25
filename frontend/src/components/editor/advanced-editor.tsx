"use client";
import { defaultValueEditor } from "@utils/default-value-editor";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorInstance,
  EditorCommandList,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { Separator } from "./ui/separator";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";

const extensions = [...defaultExtensions, slashCommand];
interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
  isDisable?: boolean;
}

const TailwindAdvancedEditor = ({
  initialValue,
  onChange,
  isDisable,
}: EditorProp) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    initialValue || null
  );
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      window.localStorage.setItem("novel-content", JSON.stringify(json));
      setSaveStatus("Saved");
    },
    500
  );

  useEffect(() => {
    if (!initialValue) {
      const content = window.localStorage.getItem("novel-content");
      if (content) setInitialContent(JSON.parse(content));
      else setInitialContent(defaultValueEditor);
    }
  }, [initialValue]);

  if (!initialContent) return null;

  return (
    <div className="max-w-screen-lg relative w-full">
      {false && (
        <div className="text-muted-foreground z-10 m-5 mb-0 ml-auto h-fit w-fit rounded-lg bg-accent px-2 py-1 text-sm">
          {saveStatus}
        </div>
      )}
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          editable={!isDisable}
          className="max-w-screen-lg border-muted relative min-h-[700px] w-full p-6 sm:p-2"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onUpdate={({ editor }) => {
            onChange(editor.getJSON());
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={!isDisable && <ImageResizer />}
        >
          <EditorCommand className="border-muted z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="text-muted-foreground px-2">
              No content
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command && item.command(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                  key={item.title}
                >
                  <div className="border-muted flex h-10 w-10 items-center justify-center rounded-md border bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default TailwindAdvancedEditor;
