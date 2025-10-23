import React, { useState, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface DropzoneProps {
    file:File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const Dropzone = ({file,inputProps,setFile}:DropzoneProps) => {

    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
                Movie Poster
            </label>

            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    isDragging ? "border-red-500 bg-red-500/10" : "border-gray-300 hover:border-red-500"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-white">
                    {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-white mt-1">PNG, JPG up to 10MB</p>

                <input
                    id="fileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    {...inputProps}
                    onChange={handleFileChange}
                />
            </div>

            {file && (
                <div className="mt-4 text-sm text-white">
                    ✅ <span className="font-medium">{file.name}</span> selected
                </div>
            )}
        </div>
    );
};

export default Dropzone;