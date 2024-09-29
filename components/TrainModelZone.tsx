import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FaImages } from "react-icons/fa";
import Image from 'next/image';
import PhotoSVG from "@/public/Photo.svg";
export default function ImageUploadZone() {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: File[] =
        acceptedFiles.filter(
          (file: File) => !files.some((f) => f.name === file.name)
        ) || [];

      if (newFiles.length + files.length > 10) {
        toast({
          title: "Too many images",
          description: "You can only upload up to 10 images in total. Please try again.",
          duration: 5000,
        });
        return;
      }

      if (newFiles.length !== acceptedFiles.length) {
        toast({
          title: "Duplicate file names",
          description: "Some of the files you selected were already added. They were ignored.",
          duration: 5000,
        });
      }

      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const newSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize + newSize > 20 * 1024 * 1024) {
        toast({
          title: "Images exceed size limit",
          description: "The total combined size of the images cannot exceed 20MB.",
          duration: 5000,
        });
        return;
      }

      setFiles([...files, ...newFiles]);

      toast({
        title: "Images selected",
        description: "The images were successfully selected.",
        duration: 5000,
      });
    },
    [files]
  );

  const removeFile = useCallback(
    (file: File) => {
      setFiles(files.filter((f) => f.name !== file.name));
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/heic': ['.heic'],
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 p-[84px_60px] bg-gray-50 rounded-tl-2xl w-[1276px] h-[672px] absolute top-[175px] left-[82px]">
      {/* Left side: My Photo */}
      <div className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-sm">
        <Image src={PhotoSVG} alt="My Photo" className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Right side: Upload area */}
      <div className="w-[674px] h-[504px] p-[12px_34px] bg-white rounded-tl-3xl shadow-sm border-t-3 border-solid border-gray-200 flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Start Uploading photos</h2>
          <p className="text-gray-600 mb-4">
            Select at least 10 of your best photos. Good photos help our AI to give you amazing results!
          </p>
        </div>

        <div
          {...getRootProps()}
          className="outline-dashed outline-2 outline-gray-300 hover:outline-blue-500 rounded-lg p-8 cursor-pointer transition-all duration-300 ease-in-out flex-grow"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <FaImages size={48} className="text-gray-400" />
            {isDragActive ? (
              <p className="text-lg text-gray-600">Drop the files here ...</p>
            ) : (
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">
                  Drag 'n' drop some files here, or click to select files
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, HEIC up to 20MB
                </p>
              </div>
            )}
            <Button variant="outline" size="lg">
              Upload files
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Selected Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
              {files.map((file) => (
                <div key={file.name} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(file)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto text-center">
          <Button size="lg" disabled={files.length === 0}>
            Continue
          </Button>
          <p className="mt-2 text-sm text-gray-500">
            By using our AI Tools, you agree to and accept our Terms of Use
          </p>
        </div>
      </div>
    </div>
  );
}
