<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Cart and wishlist live client-side in `src/lib/store.tsx` (localStorage); pure cart rules in `src/lib/cart-logic.ts` with tests — checkout is simulated, no backend needed.
- Product catalogue is static in `src/lib/products.ts`; add pieces there.
- The store context in `src/lib/store.tsx` must stay a single instance across hot updates (reuse it via `import.meta.hot.data`) and `useStore` must return an inert empty cart rather than throwing when no provider is mounted — a throw there blanks the whole page.
