import { createContext, useContext, type ReactNode } from "react";
import { motion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  level,
  kicker,
  title,
  lede,
  align = "left",
}: {
  level: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`shead shead--${align}`}>
      <p className="shead__kicker px">
        <span className="shead__lvl" data-level={level}>LVL </span>
        <span>{kicker}</span>
      </p>
      <h2 className="shead__title">{title}</h2>
      {lede && <p className="shead__lede">{lede}</p>}
    </Reveal>
  );
}

type Unlock = (id: string, label: string) => void;
export const AchievementCtx = createContext<Unlock>(() => {});
export const useAchievement = () => useContext(AchievementCtx);

/** Fires an achievement the first time the section scrolls into view. */
export function Section({
  id,
  achievement,
  className = "",
  children,
}: {
  id: string;
  achievement?: string;
  className?: string;
  children: ReactNode;
}) {
  const unlock = useAchievement();
  return (
    <motion.section
      id={id}
      data-section
      className={`section ${className}`}
      onViewportEnter={() => achievement && unlock(id, achievement)}
      viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
    >
      {children}
    </motion.section>
  );
}

// Offline build: media is embedded as base64 in window.__EFN_MEDIA and served as blob URLs.
type Embedded = Record<string, [string, string]>;
const embedded = (globalThis as unknown as { __EFN_MEDIA?: Embedded }).__EFN_MEDIA;
const blobCache = new Map<string, string>();

export const isEmbedded = Boolean(embedded);

export function hasMedia(file: string) {
  return !embedded || file in embedded;
}

export function mediaUrl(file: string) {
  if (!embedded) return `${import.meta.env.BASE_URL}media/${file}`;
  const hit = blobCache.get(file);
  if (hit) return hit;
  const entry = embedded[file];
  if (!entry) return "";
  const bin = atob(entry[1]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([bytes], { type: entry[0] }));
  blobCache.set(file, url);
  return url;
}

/** Responsive WebP photo: `name` maps to media/name.webp and media/name-sm.webp. */
export function Photo({
  name,
  alt,
  className,
  sizes = "100vw",
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  return (
    <img
      className={className}
      src={mediaUrl(`${name}.webp`)}
      srcSet={isEmbedded ? undefined : `${mediaUrl(`${name}-sm.webp`)} 960w, ${mediaUrl(`${name}.webp`)} 1920w`}
      sizes={isEmbedded ? undefined : sizes}
      alt={alt}
      width={1920}
      height={1086}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
