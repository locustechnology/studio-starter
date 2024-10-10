import React, { useState, useCallback } from 'react';
import { Upload, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
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
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(new Set());
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFiles = Array.from(event.target.files || []);
    
    const newFiles = acceptedFiles.filter(
      (file: File) => !files.some((f) => f.name === file.name)
    );

    if (files.length + newFiles.length < 4) {
      toast({
        title: "Not enough images",
        description: "Please upload at least 4 images.",
        duration: 5000,
      });
      return;
    }

    if (files.length + newFiles.length > 10) {
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
    if (files.length < 4) {
      toast({
        title: "Not enough images",
        description: "Please upload at least 4 images before continuing.",
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    const blobUrls: string[] = [];

    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const blob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/astria/train-model/image-upload',
          });
          blobUrls.push(blob.url);
          setUploadedFiles(prev => new Set(prev).add(file.name));
        } catch (error) {
          console.error(`Error uploading file ${file.name}:`, error);
          throw error;
        }
      });

      await Promise.all(uploadPromises);

      // Store the blob URLs in Supabase
      const { error } = await supabase
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-screen font-poppins bg-gray-100 p-4 lg:p-0">
      <div className="w-full max-w-md lg:max-w-none lg:w-[1276px] lg:h-[672px] bg-white rounded-2xl p-6 lg:p-[84px_60px] flex flex-col lg:flex-row gap-8 shadow-lg">
        {/* Left side - Photo guidelines */}
        <div className="w-full lg:w-[468px] rounded-3xl lg:p-6 flex flex-col gap-8 bg-[#F2F2F7] shadow-lg">
          <div className="flex justify-between items-center lg:hidden" onClick={toggleDropdown}>
            <h2 className="text-2xl font-semibold font-jakarta">Photo of yourself (Do's & Don't)</h2>
            {isDropdownOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
          {(isDropdownOpen || window.innerWidth >= 1024) && (
            <>
              <h2 className="text-2xl font-semibold font-jakarta hidden lg:block">Photo of yourself (Do's & Don't)</h2>
              <div className="w-full h-auto">
                <Image src={Frame} alt="✅ Good and ❌ Bad Photos" width={412} height={336} layout="responsive" />
              </div>
              <p className="text-xs text-gray-500 mt-auto lg:hidden">
                By using our AI Tools, you agree to and accept our <a href="/terms" className="text-blue-500 hover:underline">Terms of Use</a>
              </p>
            </>
          )}
        </div>

        {/* Right side - Upload functionality */}
        <div className="w-full lg:w-[580px] rounded-3xl p-6 lg:p-8 flex flex-col justify-between bg-white lg:border-4 lg:border-purple-400 lg:border-blue-400 lg:border-teal-400 lg:shadow-[0px_8px_48px_0px_#00000026]">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-black text-center lg:text-left">Start Uploading photos</h2>
            <p className="text-sm text-black text-center lg:text-left">
              Select at least 10 of your best photos. Good photos help our AI to give you amazing results!
            </p>
            
            {files.length === 0 ? (
              <div className="w-full border-2 border-dashed border-purple-300 rounded-2xl p-4 sm:p-8 flex flex-col items-center justify-center gap-4 mb-8 bg-white">
                <label htmlFor="file-upload" className="cursor-pointer w-full lg:w-auto">
                  <div className="bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] text-white font-semibold rounded-full flex items-center justify-center text-base sm:text-lg px-4 sm:px-8 py-3 hover:opacity-90 transition-opacity lg:px-6 lg:py-2 lg:w-auto lg:mx-auto">
                    <Upload size={20} className="mr-2" />
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
                <div className="w-full sm:w-[195px] h-[32px] flex flex-col justify-center mx-auto">
                  <p className="text-xs leading-4 text-gray-500 font-normal text-center">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs leading-4 text-gray-500 font-normal text-center">
                    PNG, JPG, HEIC up to 120MB
                  </p>
                </div>
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
            
            <p className="text-xs text-gray-500 font-normal leading-[16px] text-center px-4 sm:px-0 mb-6 hidden lg:block">
              By using our AI Tools, you agree to and accept our <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>
            </p>
            <button 
              className={`w-full lg:w-auto lg:px-12 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg text-white transition-colors ${
                files.length >= 10 && !isLoading
                  ? 'bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] hover:opacity-90'
                  : 'bg-gray-400 cursor-not-allowed'
              } lg:mx-auto lg:block`}
              onClick={handleContinue}
              disabled={files.length < 10 || isLoading}
            >
              {isLoading ? 'Uploading...' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;