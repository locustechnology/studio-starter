"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Database } from "@/types/supabase";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { modelRowWithSamples } from "@/types/utils";

type ModelsTableProps = {
  models: modelRowWithSamples[];
};

export default async function ModelsTable({ models }: ModelsTableProps) {
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/overview/models/${id}`);
  };

  return (
    <div className="rounded-md border font-poppins">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Type</TableHead>
            <TableHead className="font-bold">Samples</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models?.map((model) => (
            <TableRow
              key={model.modelId}
              onClick={() => handleRedirect(model.id)}
              className="cursor-pointer h-16 font-jakarta"
            >
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>
                <span className="flex gap-2 items-center w-min font-jakarta text-sm">
                  {model.status === "processing" ? "training" : model.status}
                  {model.status === "processing" && (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  )}
                </span>
              </TableCell>
              <TableCell className="font-medium">{model.type}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-shrink-0 items-center font-jakarta">
                  {model.samples.slice(0, 3).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                    </Avatar>
                  ))}
                  {model.samples.length > 3 && (
                    <span className="rounded-full h-10 font-jakarta px-2 py-1 bg-gray-200 text-gray-700">
                      +{model.samples.length - 3}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
