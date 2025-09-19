"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Button } from "./button";
import { Badge } from "./badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type Option = {
  name: string;
  color: string;
};

type MultiSelectProps = {
  options: Option[];
  value?: Option[];
  onChange?: (value: Option[]) => void;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>(value);

  const toggleOption = (option: Option) => {
    let newSelected: Option[];
    if (selected.find((o) => o.name === option.name)) {
      newSelected = selected.filter((o) => o.name !== option.name);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        Choose your favourite genres
      </label>

      <div className="flex flex-wrap gap-2">
        {selected.map((option) => (
          <Badge
            key={option.name}
            variant="secondary"
            className="flex items-center gap-1"
            style={{ color: option.color }}
          >
            {option.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const newSelected = selected.filter(
                  (o) => o.name !== option.name
                );
                setSelected(newSelected);
                onChange?.(newSelected);
              }}
              className="ml-1 rounded-full hover:bg-muted-foreground/20"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
            style={{ color: "gray" }}
          >
            genres...
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              <CommandGroup>
                {options.map((option: Option) => (
                  <CommandItem
                    key={option.name}
                    onSelect={() => toggleOption(option)}
                  >
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
