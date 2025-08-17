pnpm tsc --noEmit &&
pnpm run lint &&
pnpm run build &&
echo "\n\nChanges have been validated. You may not commit your changes."
