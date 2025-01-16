"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Genre {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  genres: Genre[];
}

export function CategoryFilter({ genres }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const currentGenre = searchParams.get("genre");
  const currentGenreName =
    genres.find((g) => g.id.toString() === currentGenre)?.name ??
    "All Categories";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentGenreName}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setValue("");
                setOpen(false);
                router.push("/");
              }}
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  !currentGenre ? "opacity-100" : "opacity-0"
                }`}
              />
              All Categories
            </CommandItem>
            {genres.map((genre) => (
              <CommandItem
                key={genre.id}
                onSelect={() => {
                  setValue(genre.id.toString());
                  setOpen(false);
                  router.push(`/?genre=${genre.id}`);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    currentGenre === genre.id.toString()
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                {genre.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
