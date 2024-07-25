import React from "react";
import { CommandGroup, CommandItem, CommandSeparator } from "../ui/command";
import {
  ArrowDownWideNarrow,
  CheckCheck,
  RefreshCcwDot,
  StepForward,
  WrapText,
} from "lucide-react";
import { useEditor } from "novel";
import { getPrevText } from "novel/extensions";

const options = [
  {
    value: "improve",
    label: "More information",
    icon: RefreshCcwDot,
  },
  {
    value: "shorter",
    label: "Summarise",
    icon: ArrowDownWideNarrow,
  },
  {
    value: "longer",
    label: "Talk more about this",
    icon: WrapText,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();

  return (
    <>
      <CommandGroup heading="Edit">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              const slice = editor?.state.selection.content();
              const text = editor?.storage.markdown.serializer.serialize(
                slice?.content
              );
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-purple-500" />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Ask AI">
        <CommandItem
          onSelect={() => {
            if (editor) {
              const text = getPrevText(editor, { chars: 5000 });
              onSelect(text, "continue");
            }
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <StepForward className="h-4 w-4 text-purple-500" />
          Continue writing
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
