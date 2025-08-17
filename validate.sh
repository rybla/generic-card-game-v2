(echo "typechecking..." && pnpm tsc --noEmit) &&
(echo "linting..." && pnpm run lint) &&
# (echo "building..." && pnpm run build) &&
echo "\n\nChanges have been validated. You may not commit your changes."
