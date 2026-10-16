import { createFileRoute } from "@tanstack/react-router";
import { leadSchema } from "@/lib/lead";

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const headers = { "Cache-Control": "no-store" };
        const origin = request.headers.get("origin");
        if (origin && origin !== new URL(request.url).origin) {
          return Response.json({ success: false }, { status: 403, headers });
        }
        if (!request.headers.get("content-type")?.includes("application/json")) {
          return Response.json({ success: false }, { status: 415, headers });
        }
        try {
          const raw = await request.text();
          if (raw.length > 8192) return Response.json({ success: false }, { status: 413, headers });
          const parsed = leadSchema.safeParse(JSON.parse(raw));
          if (!parsed.success) {
            return Response.json({ success: false, errors: parsed.error.flatten().fieldErrors }, { status: 400, headers });
          }
          // MOCK ONLY: replace this block with the real delivery adapter.
          // Never log names, telephone numbers, comments, or attribution data.
          // No data is persisted and no manager notification is sent.
          return Response.json({ success: true, mock: true }, { headers });
        } catch {
          return Response.json({ success: false }, { status: 400, headers });
        }
      },
    },
  },
});