import React, { useState, useCallback } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { createClient } from '@supabase/supabase-js';
import Frame from "@/public/Frame.svg"
// Initialize Supabase client using environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PhotoUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = Array.from(event.target.files || []);
    
    const newFiles = acceptedFiles.filter(
      (file: File) => !files.some((f) => f.name === file.name)
    );

    if (newFiles.length + files.length > 10) {
      toast({
        title: "Too many images",
        description: "You can only upload up to 10 images in total. Please try again.",
        duration: 5000,
      });
      return;
    }

    const totalSize = [...files, ...newFiles].reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 120 * 1024 * 1024) {  // 120MB limit
      toast({
        title: "Images exceed size limit",
        description: "The total combined size of the images cannot exceed 120MB.",
        duration: 5000,
      });
      return;
    }

    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    toast({
      title: "Images selected",
      description: "The images were successfully selected.",
      duration: 5000,
    });
  }, [files, toast]);

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleContinue = async () => {
    if (files.length < 10) {
      toast({
        title: "Not enough images",
        description: "Please upload at least 10 images before continuing.",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    const blobUrls = [];

    try {
      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/astria/train-model/image-upload', // Updated URL
        });
        blobUrls.push(blob.url);
      }

      // Store the blob URLs in Supabase
      const { data, error } = await supabase
        .from('photos')
        .insert(blobUrls.map(url => ({ url })));

      if (error) throw error;

      toast({
        title: "Upload successful",
        description: "Your photos have been uploaded and saved successfully.",
        duration: 5000,
      });

      // Redirect or perform next steps
      router.push('/next-page');
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photos. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen r">
      <div className="flex flex-col sm:flex-row mt-8" style={{ gap: '16px' }}>
        <div className="w-full sm:w-[468px] rounded-3xl p-6 sm:p-[12px_28px] flex flex-col gap-8 sm:gap-5" style={{ height: 'auto', minHeight: '504px', background: 'var(--Backgrounds-Secondary, #F2F2F7)', boxShadow: '0px 8px 48px 0px #00000026' }}>
          <h2 className="text-2xl font-semibold">Photo of yourself</h2>
          <div className="w-full h-auto">
            <Image src={Frame} alt="✅ Good and ❌ Bad Photos" width={412} height={336} layout="responsive" />
          </div>
          <p className="text-xs text-gray-500 mt-auto">
            By using our AI Tools, you agree to and accept our <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>
          </p>
        </div>

      {/* Right side - Upload functionality */}
      <div className="w-[674px] h-[504px] rounded-tl-[24px] p-8 bg-white shadow-md border-t-3 border-purple-200 flex flex-col gap-6">
        <h2 className="text-center mb-4 mx-auto" style={{
          width: '277px',
          height: '36px',
          fontFamily: 'Poppins',
          fontSize: '24px',
          fontWeight: 400,
          lineHeight: '36px'
        }}>Start Uploading photos</h2>
        <div className="flex flex-col items-center w-[606px] h-[16px] ">
        <p className="font-['Poppins'] text-xs font-normal leading-4 text-center text-gray-600">Select at least 10 of your best photos. Good photos help our AI to give you amazing results!</p>
        </div>
        
        {files.length === 0 ? (
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-12 text-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="bg-purple-500 text-white font-semibold rounded-full inline-flex items-center justify-center text-lg transition duration-300 mb-6 px-8 py-4 hover:bg-purple-600">
                <Upload size={24} className="mr-3" />
                <span>Upload files</span>
              </div>
              <input 
                id="file-upload" 
                type="file" 
                className="hidden"
                multiple 
                onChange={handleFileUpload} 
                accept="image/*" 
              />
            </label>
            <p className="text-base text-gray-500">Click to upload or drag and drop</p>
            <p className="text-base text-gray-500">PNG, JPG, HEIC up to 120MB</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-8">
            {files.map((file, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveFile(file)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 10 - files.length) }).map((_, index) => (
              <label
                key={`empty-${index}`}
                htmlFor="file-upload"
                className="border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center cursor-pointer aspect-square"
              >
                <span className="text-5xl text-purple-400">+</span>
              </label>
            ))}
            <input 
              id="file-upload" 
              type="file" 
              className="hidden"
              multiple 
              onChange={handleFileUpload} 
              accept="image/*" 
            />
          </div>
        )}
        
        <p className="text-[10px] text-gray-500 font-['Poppins'] font-normal leading-[16px] text-center px-4 sm:px-0 -mt-12">
          By using our AI Tools, you agree to and accept our <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>
        </p>
        <button 
          className={`w-full py-4 rounded-full font-semibold text-lg text-white transition-colors ${
            files.length >= 10 && !isLoading
              ? 'bg-purple-500 hover:bg-purple-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleContinue}
          disabled={files.length < 10 || isLoading}
        >
          {isLoading ? 'Uploading...' : 'Continue →'}
        </button>
      </div>
    </div>
  </div>
);
};

export default PhotoUpload;