'use client'

import { useState } from 'react'
import supabase from '../../api/client'

interface ImageUploadProps {
  onUploadSuccess: () => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [season, setSeason] = useState<string>('1')
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      setSelectedFiles(Array.from(files))
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !season) {
      return
    }

    setUploading(true)

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        // Upload image
        const fileExt = file.name.split('.').pop()

        const fileName = `season-${season}-${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, file)

        if (uploadError) throw uploadError

        // Get URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('gallery').getPublicUrl(fileName)

        // Insert database record
        const { error: dbError } = await supabase.from('cricket_images').insert({
          season: parseInt(season),
          image_url: publicUrl,
          image_name: file.name,
        })

        if (dbError) throw dbError
      })

      await Promise.all(uploadPromises)

      setSelectedFiles([])

      const fileInput = document.getElementById('image-upload') as HTMLInputElement

      if (fileInput) {
        fileInput.value = ''
      }

      onUploadSuccess()
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col w-full text-xl items-center">
      <div className="mb-4">Upload Cricket Images</div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col mt-4 mb-8 items-center border-2 border-[#252525] rounded-2xl">
          <label className="pb-2" htmlFor="image-upload">
            Select Images
          </label>

          <div className="pl-12 bg-[#353535] rounded-[0px_0px_14px_14px]">
            <input
              id="image-upload"

              type="file"

              accept="image/*"

              multiple

              onChange={handleFileSelect}

              className="mt-1"
            />
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="text-sm">
            Selected:
            <br />
            {selectedFiles.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>
        )}

        <div>
          <select
            className="bg-[#000000]"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="1">Season 1</option>

            <option value="2">Season 2</option>

            <option value="3">Season 3</option>

            <option value="4">Season 4</option>

            <option value="5">Season 5</option>

            <option value="6">Season 6</option>
          </select>
        </div>

        <button
          onClick={handleUpload}

          disabled={uploading || selectedFiles.length === 0 || !season}

          className="w-40 p-1 rounded-xl border-2 border-[#252525]"
        >
          {uploading ? `Uploading ${selectedFiles.length} images...` : 'Upload Images'}
        </button>
      </div>
    </div>
  )
}

export default ImageUpload
