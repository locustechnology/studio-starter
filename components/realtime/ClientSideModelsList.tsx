"use client";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { modelRowWithSamples } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import ModelsTable from "../ModelsTable";

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export const revalidate = 0;

type ClientSideModelsListProps = {
  serverModels: modelRowWithSamples[] | [];
};

export default function ClientSideModelsList({
  serverModels,
}: ClientSideModelsListProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [models, setModels] = useState<modelRowWithSamples[]>(serverModels);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-models")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "models" },
        async (payload: any) => {
          const samples = await supabase
            .from("samples")
            .select("*")
            .eq("modelId", payload.new.id);

          const newModel: modelRowWithSamples = {
            ...payload.new,
            samples: samples.data,
          };

          const dedupedModels = models.filter(
            (model) => model.id !== payload.old?.id
          );

          setModels([...dedupedModels, newModel]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, models, setModels]);

  const trainModelUrl = "/overview/models/train/corporate-headshots?step=gender";

  return (
    <div id="train-model-container" className="w-full" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
      {models && models.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 w-full justify-between items-center text-center" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
            <h1 className="font-bold text-lg">Your models</h1>
            <Link href={trainModelUrl} className="w-fit">
              <Button size={"lg"} style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)', fontSize: '16px', fontFamily: 'Jakarta Sans, sans-serif' }}>
                Train model
              </Button>
            </Link>
          </div>
          <ModelsTable models={models} />
        </div>
      )}
      {models && models.length === 0 && (
        <div className="flex flex-col gap-4 items-center" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
          <FaImages size={64} className="text-gray-500" />
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
            Get started by training your first model.
          </h1>
          <div>
            <Link href={trainModelUrl}>
              <Button size={"lg"} style={{ background: 'linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)', fontFamily: 'Jakarta Sans, sans-serif' }}>Train model</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}