"use client"
import {React,useState} from 'react'
import supabase from '@/api/client'

function Uploading() {
  const [season, setSeason] = useState(1);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setMessage('');
    const filePath = `season${season}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('gallery') // Make sure you have a 'gallery' bucket in Supabase
      .upload(filePath, file);

    if (error) {
      setMessage(`Upload failed: ${error.message}`);
    } else {
      setMessage('File uploaded successfully!');
    }
    setUploading(false);
    setFile(null); 
    // You might want to trigger a refresh of the gallery component here
  };

  return (
    <div className='flex flex-col gap-4 text-xl items-center'>
      <div>Upload memories</div>
      <div className='flex flex-row gap-5 items-center'>
        <label htmlFor="season">Season :</label>
        <input
          id="season"
          className='border-1 border-[#272727] rounded-lg bg-[#404040] p-1 text-center'
          type="number"
          min={1}
          max={5}
          value={season}
          onChange={(e) => setSeason(Number(e.target.value))}
        />
      </div>
      <input
        className='border-1 bg-[#404040] border-[#272727] rounded-lg pl-2'
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="pt-2 pb-2 pl-4 pr-4 rounded-lg cursor-pointer bg-[#454545] active:bg-[#1d1c1c] border-2 border-[#252921] disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {message && <div className="text-sm mt-2">{message}</div>}
    </div>
  );
}

export default Uploading;