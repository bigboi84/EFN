// Saves booking requests to the published page's shared store when it is available
// (claude.ai artifact `db` capability). Elsewhere the form falls back to a copyable summary.

export type BookingKind = "tournament" | "gameshow" | "school";
export type BookingResult = { status: "saved"; ref: string } | { status: "offline"; ref: string };

type Claude = { use: (name: string) => Promise<unknown> };
type Db = {
  doc: (path: string) => { set: (d: Record<string, unknown>) => Promise<void> };
  collection: (path: string) => { add: (d: Record<string, unknown>) => Promise<{ id: string }> };
};
type User = { id: () => Promise<string | null> };

const makeRef = () => "EFN-" + Math.random().toString(36).slice(2, 7).toUpperCase();

export async function submitBooking(kind: BookingKind, fields: Record<string, string>): Promise<BookingResult> {
  const ref = makeRef();
  const claude = (window as unknown as { claude?: Claude }).claude;
  if (!claude?.use) return { status: "offline", ref };
  try {
    const [db, user] = (await Promise.all([claude.use("db"), claude.use("user")])) as [Db | null, User | null];
    if (!db || !user) return { status: "offline", ref };
    const uid = await user.id();
    if (!uid) return { status: "offline", ref };
    const at = new Date().toISOString();
    await db.collection(`bookings/${uid}/requests`).add({ kind, ref, at, status: "new", ...fields });
    await db.doc(`bookings/${uid}`).set({ lastAt: at, lastRef: ref });
    return { status: "saved", ref };
  } catch {
    return { status: "offline", ref };
  }
}
