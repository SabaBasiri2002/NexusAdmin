"use client";

import {
  Bell,
  LayoutDashboard,
  LogOut,
  Moon,
  Package,
  PackagePlus,
  Search,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/lib/auth";

import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type SearchResults = {
  users: { id: number; name: string; email: string }[];
  products: { id: number; name: string; category: string }[];
};

const emptyResults: SearchResults = { users: [], products: [] };

const destinations = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Products", href: "/dashboard/products", icon: Package },
];

const actions = [
  { label: "Create new user", href: "/dashboard/users/create", icon: User },
  { label: "Add new product", href: "/dashboard/products/create", icon: PackagePlus },
];

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>(emptyResults);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchingDestinations = destinations.filter(({ label }) =>
    label.toLowerCase().includes(normalizedQuery),
  );
  const matchingActions = actions.filter(({ label }) =>
    label.toLowerCase().includes(normalizedQuery),
  );

  useEffect(() => {
    if (!searchOpen || !normalizedQuery) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setSearchLoading(true);
      setSearchError(false);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(normalizedQuery)}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const results = (await response.json()) as SearchResults;
        if (!controller.signal.aborted) {
          setSearchResults(results);
        }
      } catch {
        if (!controller.signal.aborted) {
          setSearchResults(emptyResults);
          setSearchError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearchLoading(false);
        }
      }
    }, 200);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [searchOpen, normalizedQuery]);

  function navigateTo(href: string) {
    handleSearchOpenChange(false);
    router.push(href);
  }

  function handleSearchOpenChange(open: boolean) {
    setSearchOpen(open);
    if (!open) {
      setSearchQuery("");
      setSearchResults(emptyResults);
      setSearchLoading(false);
      setSearchError(false);
    }
  }

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.code === "Slash") {
        event.preventDefault();
        event.stopPropagation();

        setSearchOpen(!searchOpen);
        if (searchOpen) {
          setSearchQuery("");
          setSearchResults(emptyResults);
          setSearchLoading(false);
          setSearchError(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [searchOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl md:px-6">
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-3">
            <SidebarTrigger className="size-9 shrink-0 rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" />

            <div className="h-5 w-px shrink-0 bg-border" />

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold tracking-tight md:text-base">
                Warden
              </h1>

              <p className="hidden text-xs text-muted-foreground lg:block">
                Everything In Order
              </p>
            </div>  
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Desktop Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden h-10 w-64 items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-3.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground md:flex lg:w-72"
            >
              <div className="flex items-center gap-2.5">
                <Search className="size-4" />
                <span>Search...</span>
              </div>
              <kbd className="rounded border border-border bg-background px-2 py-1 text-xs font-medium text-muted-foreground">
                Ctrl + /
              </kbd>
            </button>

            {/* Mobile Search */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="size-9 rounded-lg md:hidden"
            >
              <Search className="size-4" />

              <span className="sr-only">Search</span>
            </Button>

            {/* Theme */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="size-9 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <Sun className="hidden size-4 dark:block" />
              <Moon className="size-4 dark:hidden" />

              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="relative size-9 rounded-lg text-muted-foreground hover:text-foreground"
                  />
                }
              >
                <Bell className="size-4" />

                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-red-500 ring-2 ring-background" />

                <span className="sr-only">Notifications</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80 rounded-xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center justify-between px-2 py-2">
                    <span>Notifications</span>

                    <span className="text-xs font-normal text-muted-foreground">
                      3 unread
                    </span>
                  </DropdownMenuLabel>

                  <DropdownMenuItem className="cursor-pointer items-start gap-3 rounded-lg p-3">
                    <div className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-500" />

                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-medium">New user registered</p>

                      <p className="text-xs text-muted-foreground">
                        A new user joined your platform.
                      </p>

                      <p className="text-[11px] text-muted-foreground/70">
                        2 minutes ago
                      </p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer items-start gap-3 rounded-lg p-3">
                    <div className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500" />

                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-medium">Product updated</p>

                      <p className="text-xs text-muted-foreground">
                        Product information was updated successfully.
                      </p>

                      <p className="text-[11px] text-muted-foreground/70">
                        12 minutes ago
                      </p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer items-start gap-3 rounded-lg p-3">
                    <div className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-500" />

                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-medium">Inventory warning</p>

                      <p className="text-xs text-muted-foreground">
                        One product is running low on stock.
                      </p>

                      <p className="text-[11px] text-muted-foreground/70">
                        2 hours ago
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

            {/* Profile */}
            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-xl px-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
              >
                <Avatar className="size-8 border border-border">
                  <AvatarImage src="/avatar.png" alt="Admin" />

                  <AvatarFallback className="bg-muted text-xs font-semibold">
                    SB
                  </AvatarFallback>
                </Avatar>

                <div className="hidden min-w-0 text-left lg:block">
                  <p className="max-w-28 truncate text-xs font-medium">
                    Saba
                  </p>

                  <p className="max-w-28 truncate text-[11px] text-muted-foreground">
                    Administrator
                  </p>
                </div>
              </DropdownMenuTrigger>    

              <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2 py-2">
                    <p className="text-sm font-medium">Parham</p>

                    <p className="mt-0.5 text-xs font-normal text-muted-foreground">
                      Administrator
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg">
                    <User className="size-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg">
                    <Settings className="size-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <form action={logoutAction}>
                    <DropdownMenuItem
                      nativeButton
                      render={<button type="submit" />}
                      className="w-full cursor-pointer gap-2 rounded-lg text-destructive focus:text-destructive"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={handleSearchOpenChange}>
        <Command shouldFilter={false}>
          <CommandInput
            value={searchQuery}
            onValueChange={(value) => {
              setSearchQuery(value);
              setSearchResults(emptyResults);
              setSearchError(false);
              setSearchLoading(Boolean(value.trim()));
            }}
            placeholder="Search pages, users, products..."
            aria-label="Search pages, users, and products"
          />

          <CommandList >
            {matchingDestinations.length > 0 && (
              <CommandGroup heading="Navigation">
                {matchingDestinations.map(({ label, href, icon: Icon }) => (
                  <CommandItem key={href} value={href} onSelect={() => navigateTo(href)}>
                    <Icon className="size-4" />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {matchingActions.length > 0 && (
              <CommandGroup heading="Actions">
                {matchingActions.map(({ label, href, icon: Icon }) => (
                  <CommandItem key={href} value={href} onSelect={() => navigateTo(href)}>
                    <Icon className="size-4" />
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {searchResults.users.length > 0 && (
              <CommandGroup heading="Users">
                {searchResults.users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={`user-${user.id}`}
                    onSelect={() => navigateTo(`/dashboard/users/${user.id}`)}
                  >
                    <User className="size-4" />
                    <span className="min-w-0 truncate">{user.name}</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">{user.email}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {searchResults.products.length > 0 && (
              <CommandGroup heading="Products">
                {searchResults.products.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={`product-${product.id}`}
                    onSelect={() => navigateTo(`/dashboard/products/${product.id}`)}
                  >
                    <Package className="size-4" />
                    <span className="min-w-0 truncate">{product.name}</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">{product.category}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {normalizedQuery && searchLoading && (
              <p className="px-3 py-4 text-sm text-muted-foreground" role="status">Searching...</p>
            )}
            {normalizedQuery && searchError && (
              <p className="px-3 py-4 text-sm text-destructive" role="alert">Search is unavailable. Please try again.</p>
            )}
            {normalizedQuery && !searchLoading && !searchError &&
              matchingDestinations.length === 0 && matchingActions.length === 0 &&
              searchResults.users.length === 0 && searchResults.products.length === 0 && (
                <p className="px-3 py-4 text-sm text-muted-foreground">No results found.</p>
              )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
