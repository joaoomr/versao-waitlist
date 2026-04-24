import { X, UserPlus, UserCheck, Heart } from "lucide-react";

interface ActionButtonsProps {
  onPass?: () => void;
  onFollow?: () => void;
  onLike?: () => void;
  followed?: boolean;
}

export function ActionButtons({ onPass, onFollow, onLike, followed = false }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-7">
      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={onPass}
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-swipe-red/40 bg-swipe-red/6 transition-colors hover:bg-swipe-red/15"
        >
          <X size={24} className="text-swipe-red" strokeWidth={2} />
        </button>
        <span className="text-[11px] font-medium text-swipe-red">Passa</span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={followed ? undefined : onFollow}
          className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 transition-colors ${
            followed
              ? "border-swipe-blue bg-swipe-blue cursor-default"
              : "border-swipe-blue/40 bg-swipe-blue/6 hover:bg-swipe-blue/15"
          }`}
        >
          {followed ? (
            <UserCheck size={20} className="text-white" strokeWidth={2} />
          ) : (
            <UserPlus size={20} className="text-swipe-blue" strokeWidth={2} />
          )}
        </button>
        <span className={`text-[11px] font-medium ${followed ? "text-swipe-blue" : "text-swipe-blue"}`}>
          {followed ? "Seguindo" : "Seguir"}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={onLike}
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-swipe-green/40 bg-swipe-green/6 transition-colors hover:bg-swipe-green/15"
        >
          <Heart size={24} className="text-swipe-green" strokeWidth={2} />
        </button>
        <span className="text-[11px] font-medium text-swipe-green">Curtir</span>
      </div>
    </div>
  );
}
