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

- Keep the landing page at `/` with hash navigation to semantic sections; the header lives in its own component so future section content stays independent.
- Define visual roles and reusable page styles in `src/styles.css`, and use shared Button variants for actions to keep the brand consistent.
- Keep the coffee catalogue in its own section component and import downloaded photos through asset pointers so assortment content remains independent and images are reliably served.
- Share the lead schema between the React Hook Form client and `/api/lead` handler; keep the endpoint explicitly mocked without logging or storing personal data until a real delivery adapter is connected.
- Capture attribution and restore the lead cooldown after hydration only; connect catalogue selection through the existing order-intent store to avoid SSR mismatches and preserve order context.
