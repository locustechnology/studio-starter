import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FaImages } from "react-icons/fa";

export default function ResponsivePhotoUpload() {
  const [files, setFiles] = useState([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    toast({
      title: "Images selected",
      description: "The images were successfully selected.",
      duration: 5000,
    });
  }, [files, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/heic': ['.heic'],
    },
  });

  const removeFile = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-gray-50 w-[1276px] h-[672px] absolute top-[175px] left-[82px] p-[84px_60px_84px_60px] justify-center items-center">
      {/* Left side: Photo examples */}
      <div className="w-[468px] h-[504px] p-6 bg-[#F2F2F7] rounded-3xl shadow-lg flex flex-col gap-7">
        <h2 className="text-2xl font-bold">Photo of yourself</h2>
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            Good Photo <span className="ml-2 text-2xl">🤩</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Upload photos of your face only, well-lit and in focus.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={`good-${i}`} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            Bad Photo <span className="ml-2 text-2xl">🫣</span>
          </h3>
          <p className="text-sm text-gray-600 mb-2">Group shot, children, animals, full length, hat, sunglasses, scarf, mask, face covering.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={`bad-${i}`} className="aspect-square bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Upload area */}
      <div className="w-[674px] h-[504px] bg-white rounded-3xl flex items-center justify-center relative overflow-hidden" style={{
        border: '3px solid transparent',
        borderRadius: '24px',
        backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #8371FF -39.48%, #A077FE 32.07%, #01C7E4 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        boxShadow: '0px 8px 48px 0px #00000026, 0 0 0 3px transparent'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] opacity-50" style={{ zIndex: -1 }}></div>
        <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center h-[90%] w-[90%] max-w-[600px]">
          <h2 className="text-2xl font-bold mb-2 text-center">Start Uploading photos</h2>
          <p className="text-gray-600 mb-8 text-center" style={{ width: '540px', height: '16px' }}>
            Select at least 10 of your best photos. Good photos help our AI to give you amazing results!
          </p>

          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer transition-all duration-300 ease-in-out w-full max-w-md flex flex-col items-center justify-center"
          >
            <input {...getInputProps()} />
            <FaImages size={48} className="text-gray-400 mb-4" />
            {isDragActive ? (
              <p className="text-lg text-gray-600">Drop the files here ...</p>
            ) : (
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">
                  Drag 'n' drop some files here, or click to select files
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, HEIC up to 20MB</p>
              </div>
            )}
          </div>

          <Button variant="outline" size="lg" className="mt-6">
            Upload files
          </Button>

          {files.length > 0 && (
            <div className="mt-6 w-full">
              <h3 className="text-xl font-semibold mb-2">Selected Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-[200px] overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
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
                {[...Array(Math.max(0, 10 - files.length))].map((_, index) => (
                  <div key={`empty-${index}`} className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-3xl text-gray-300">+</span>
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
    </div>
  );
}
