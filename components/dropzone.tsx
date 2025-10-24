import React, { DragEvent, ChangeEvent, useState, useId } from "react";
import { Upload } from "lucide-react";

interface DropzoneProps {
    file: File | null;
    setFile: (file: File | null) => void;
    inputProps?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >;
}

const Dropzone: React.FC<DropzoneProps> = ({ file, setFile, inputProps }) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputId = useId(); // ensures unique ID for accessibility & multiple instances

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

    const handleClick = () => {
        const inputEl = document.getElementById(inputId) as HTMLInputElement | null;
        inputEl?.click();
    };

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
                onClick={handleClick}
            >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-white">
                    {file ? file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-white mt-1">PNG, JPG up to 10MB</p>

                <input
                    id={inputId}
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
