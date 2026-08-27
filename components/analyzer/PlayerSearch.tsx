import React, { useState, useRef, useEffect } from "react";
import { Player } from "@/lib/trade/types";

interface PlayerSearchProps {
  availablePlayers: Player[];
  onSelect: (player: Player) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PlayerSearch({ availablePlayers, onSelect, placeholder = "Search players...", disabled = false }: PlayerSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredPlayers = availablePlayers
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredPlayers.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredPlayers.length) {
        handleSelect(filteredPlayers[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (player: Player) => {
    onSelect(player);
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const activeElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          disabled={disabled}
          placeholder={disabled ? "Search disabled" : placeholder}
          className="w-full h-11 pl-10 pr-4 rounded-lg border border-border-color focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm transition-all disabled:opacity-50 disabled:bg-gray-50"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Search players"
          aria-expanded={isOpen}
          aria-controls="player-listbox"
          aria-activedescendant={highlightedIndex >= 0 ? `player-option-${highlightedIndex}` : undefined}
          role="combobox"
        />
      </div>

      {isOpen && query.length > 0 && (
        <ul
          id="player-listbox"
          role="listbox"
          ref={listRef}
          className="absolute z-20 mt-1 w-full bg-white border border-border-color rounded-lg shadow-xl max-h-60 overflow-y-auto"
        >
          {filteredPlayers.length === 0 ? (
            <li className="p-4 text-sm text-muted-text text-center" role="option" aria-selected="false">No players found.</li>
          ) : (
            filteredPlayers.map((player, index) => (
              <li
                key={player.id}
                id={`player-option-${index}`}
                role="option"
                aria-selected={index === highlightedIndex}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(player)}
                className={`flex items-center justify-between p-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                  index === highlightedIndex ? "bg-blue-50 border-l-4 border-l-primary-blue" : "hover:bg-gray-50 border-l-4 border-l-transparent"
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-main-text">{player.name}</div>
                  <div className="text-xs text-muted-text mt-0.5">
                    {player.team} &bull; {player.positions.join(", ")}
                  </div>
                </div>
                <div className="text-xs font-semibold text-primary-blue">
                  Add +
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
