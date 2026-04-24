import { MapPin } from "lucide-react";
import { Avatar, Badge } from "@/components/ui";

interface SwipeCardProps {
  name: string;
  location: string;
  experiences: string[];
  interests: string[];
  expertise: string[];
  objectives: string[];
}

export function SwipeCard({
  name,
  location,
  experiences,
  interests,
  expertise,
  objectives,
}: SwipeCardProps) {
  return (
    <div className="flex w-[420px] flex-col overflow-hidden rounded-[24px] border border-border-strong bg-bg-card shadow-[var(--shadow-elevated)]">
      {/* Photo area */}
      <div className="flex h-[200px] items-center justify-center bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <Avatar name={name} size="xl" className="border-[3px]" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-[22px] font-bold text-heading">{name}</h3>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-placeholder" />
            <span className="text-sm text-body">{location}</span>
          </div>
        </div>

        {/* Experiencia */}
        {experiences.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-accent">EXPERIENCIA</span>
            {experiences.map((exp) => (
              <span key={exp} className="text-sm text-label">{exp}</span>
            ))}
          </div>
        )}

        {/* Interesses */}
        {interests.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-accent">INTERESSES</span>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((tag) => (
                <Badge key={tag} variant="interest">{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Atuacao */}
        {expertise.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-swipe-green">ATUACAO</span>
            <div className="flex flex-wrap gap-1.5">
              {expertise.map((tag) => (
                <Badge key={tag} variant="expertise">{tag}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Objetivos */}
        {objectives.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold tracking-wider text-warning">OBJETIVOS</span>
            <div className="flex flex-wrap gap-1.5">
              {objectives.map((tag) => (
                <Badge key={tag} variant="objective">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
