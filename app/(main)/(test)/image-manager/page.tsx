'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import {
    useDeleteImageMutation,
    useGetImagesQuery,
    useUpdateImageMutation,
    useUploadImageMutation
} from "@/redux/services/upload/upload";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ANY} from "@/utils/commons/type";

export default function ImageManager() {
    const { data, isLoading } = useGetImagesQuery();
    const [uploadImage] = useUploadImageMutation();
    const [updateImage] = useUpdateImageMutation();
    const [deleteImage] = useDeleteImageMutation();

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert('Select an image first!');
        setLoading(true);
        try {
            await uploadImage(file).unwrap();
            setFile(null);
        } catch (err: ANY) {
            alert('Upload failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (oldPath: string) => {
        if (!file) return alert('Select a new image first!');
        setLoading(true);
        try {
            await updateImage({ file, oldPath }).unwrap();
            setFile(null);
        } catch (err: ANY) {
            alert('Update failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (path: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;
        try {
            await deleteImage(path).unwrap();
        } catch (err: ANY) {
            alert('Delete failed: ' + err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>🖼 Supabase Image CRUD (RTK Query)</h1>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            <hr style={{ margin: '20px 0' }} />

            <h2>📂 Image List</h2>
            {isLoading ? (
                <p>Loading images...</p>
            ) : (
                <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                    {data?.contents?.map((img) => {
                        const path = `uploads/${img.name}`;
                        return (
                            <div key={img.url} style={{ border: '1px solid #ddd', padding: 10, borderRadius: 8 }}>
                                <Image
                                    src={img.url}
                                    alt={img.name}
                                    style={{ width: '100%', borderRadius: 8 }}
                                    width={200}
                                    height={200}
                                />
                                <p style={{ wordBreak: 'break-all', fontSize: 12 }}>{path}</p>
                                <button onClick={() => handleDelete(path)}>🗑 Delete</button>{' '}
                                <button onClick={() => handleUpdate(path)} disabled={loading}>
                                    ♻ Replace
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}
