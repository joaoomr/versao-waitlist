"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { Input, Textarea } from "@/components/ui";
import { LocationAutocomplete } from "@/components/ui/location-autocomplete";

interface PerfilBaseData {
  nome: string;
  idade: string;
  bio: string;
  redeSocial: string;
  site: string;
  estado: string;
  cidade: string;
  codigoIbge: number | null;
  avatarFile: File | null;
}

interface StepPerfilBaseProps {
  tipo: "pessoa" | "empresa" | null;
  data: PerfilBaseData;
  onChange: (data: PerfilBaseData) => void;
}

export function StepPerfilBase({ tipo, data, onChange }: StepPerfilBaseProps) {
  const isEmpresa = tipo === "empresa";
  const fileRef = useRef<HTMLInputElement>(null);

  function update(field: keyof PerfilBaseData, value: string | number | null | File) {
    onChange({ ...data, [field]: value });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) return;
      update("avatarFile", file);
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-bg-card p-7 shadow-[var(--shadow-elevated)]">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-heading">
          {isEmpresa ? "Informacoes da empresa" : "Informacoes do perfil"}
        </h2>
        <p className="text-sm text-body">
          Preencha seus dados basicos. Voce pode editar depois.
        </p>
      </div>

      {/* Avatar upload */}
      <div className="flex flex-col items-center gap-1.5">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary/40 hover:border-primary transition-colors overflow-hidden"
        >
          {data.avatarFile ? (
            <img
              src={URL.createObjectURL(data.avatarFile)}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Upload size={22} className="text-placeholder" strokeWidth={1.5} />
          )}
        </button>
        <span className="text-xs text-placeholder">
          {data.avatarFile ? data.avatarFile.name : "Adicionar foto — JPG ou PNG, max 5MB"}
        </span>
      </div>

      {/* Name + Age */}
      <div className="flex gap-4">
        <div className="flex-[2]">
          <Input
            label={isEmpresa ? "Nome da empresa" : "Nome completo"}
            placeholder={isEmpresa ? "Nome da sua empresa" : "Seu nome"}
            value={data.nome}
            onChange={(e) => update("nome", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input
            label={isEmpresa ? "Tempo de existencia" : "Idade"}
            placeholder={isEmpresa ? "Ex: 5 anos" : "Ex: 28"}
            value={data.idade}
            onChange={(e) => update("idade", e.target.value)}
          />
        </div>
      </div>

      {/* Bio */}
      <Textarea
        label={isEmpresa ? "Bio da empresa" : "Bio"}
        placeholder={
          isEmpresa
            ? "Descreva o que sua empresa faz e o que busca na plataforma..."
            : "Conte um pouco sobre voce e o que busca profissionalmente..."
        }
        maxChars={500}
        charCount={data.bio.length}
        value={data.bio}
        onChange={(e) => update("bio", e.target.value)}
      />

      {/* Social + Site */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            label="Rede social"
            placeholder="@ seu_usuario"
            value={data.redeSocial}
            onChange={(e) => update("redeSocial", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Site / Portfolio"
            placeholder="https://"
            value={data.site}
            onChange={(e) => update("site", e.target.value)}
          />
        </div>
      </div>

      {/* Location */}
      <LocationAutocomplete
        label="Localizacao"
        placeholder="Buscar cidade ou estado..."
        value={data.cidade && data.estado ? `${data.cidade}, ${data.estado}` : ""}
        onChange={(val) => {
          // LocationAutocomplete returns "Cidade, UF" format
          if (val && val.includes(",")) {
            const parts = val.split(",").map((s) => s.trim());
            onChange({ ...data, cidade: parts[0], estado: parts[1] });
          }
        }}
      />
    </div>
  );
}
