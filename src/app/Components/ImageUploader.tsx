"use client"
import { useState } from "react"
import  supabase  from "../../api/client"


interface ImageUploadProps {
  onUploadSuccess: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [season, setSeason] = useState<string>('1');
  const [uploading, setUploading] = useState(false);


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !season) {
      return;
    }

    setUploading(true);

    try {
      // Upload file to Supabase storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `season-${season}-${Date.now()}.${fileExt}`;
      
      const {error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('cricket_images')
        .insert({
          season: parseInt(season),
          image_url: publicUrl,
          image_name: selectedFile.name
        });

      if (dbError) throw dbError;

      // Reset form
      setSelectedFile(null);
      setSeason('');
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      onUploadSuccess();

    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full text-xl items-center">
      <div className="mb-4">
        Upload Cricket Images
      </div>
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col mt-4 mb-8 items-center border-2 border-[#252525] rounded-2xl">
          <label className="pb-2"  htmlFor="image-upload">Select Image</label>
          <div className="pl-12 bg-[#353535] rounded-[0px_0px_14px_14px]">
            <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="mt-1"/>
          </div>
          
        </div>

        <div className="flex items-center">
          <select className="bg-[#000000]" value={season} onChange={(e)=>setSeason(e.target.value)}>
            
              <option value="1">Season 1</option>
              <option value="2">Season 2</option>
              <option value="3">Season 3</option>
              <option value="4">Season 4</option>
              <option value="5">Season 5</option>
            
          </select>
        </div>

        <button 
          onClick={handleUpload} 
          disabled={uploading || !selectedFile || !season}
          className="w-40 p-1 rounded-xl border-2 border-[#252525] "
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
