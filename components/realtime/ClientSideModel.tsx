"use client";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase";
import { imageRow, modelRow, sampleRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const revalidate = 0;

type ClientSideModelProps = {
  serverModel: modelRow;
  serverImages: imageRow[];
  samples: sampleRow[];
};

function ClientSideModelImages({ modelId }: { modelId: string }) {
  const [images, setImages] = useState<imageRow[]>([]);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel('realtime-images')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'images', filter: `modelid=eq.${modelId}` },
        (payload) => {
          console.log('Change received!', payload);
          setImages((current) => [...current, payload.new as imageRow]);
        }
      )
      .subscribe();

    // Initial fetch of images
    fetchImages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [modelId, supabase]);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('modelid', modelId);
    if (error) {
      console.error('Error fetching images:', error);
    } else {
      setImages(data);
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-4" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
      {images.map((image) => (
        <img key={image.id} src={image.uri} alt="Generated image" className="rounded-md w-60 object-cover" />
      ))}
    </div>
  );
}

export default function ClientSideModel({
  serverModel,
  serverImages,
  samples,
}: ClientSideModelProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [model, setModel] = useState<modelRow>(serverModel);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-model")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "models" },
        (payload: { new: modelRow }) => {
          setModel(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, model, setModel]);

  return (
    <div id="train-model-container" className="w-full h-full" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
      <div className="flex flex-col w-full mt-4 gap-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          {samples && (
            <div className="flex w-full lg:w-1/2 flex-col gap-2" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
              <h2 className="text-xl font-poppins">Training Data</h2>
              <div className="flex flex-row gap-4 flex-wrap">
                {samples.map((sample) => (
                  <img
                    key={sample.id}
                    src={sample.uri}
                    className="rounded-md w-60 h-60 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col w-full lg:w-1/2 rounded-md" style={{ fontFamily: 'Jakarta Sans, sans-serif' }}>
            {model.status === "finished" && (
              <div className="flex flex-1 flex-col gap-2">
                <h1 className="text-xl font-poppins">Results</h1>
                <ClientSideModelImages modelId={model.id.toString()} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}