import { supabaseStorageClient as supabase } from "@/lib/supabase/config/serverStorage";

const BUCKET = "images";
const FOLDER = "uploads";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export class SupabaseStorageService {
    private readonly bucket = BUCKET;
    private readonly folder = FOLDER;

    getPublicUrl(path: string): string {
        return supabase.storage.from(this.bucket).getPublicUrl(path).data.publicUrl;
    }

    validateFile(file: File | null): string | null {
        if (!file) return "No file provided";
        if (!ALLOWED_TYPES.includes(file.type)) return "Invalid file type";
        if (file.size > MAX_FILE_SIZE) return "File size exceeds limit";
        return null;
    }

    async listFiles() {
        const { data, error } = await supabase.storage.from(this.bucket).list(this.folder, {
            sortBy: { column: "created_at", order: "desc" },
        });
        if (error) throw error;

        return data.map((file) => ({
            name: file.name,
            url: this.getPublicUrl(`${this.folder}/${file.name}`),
        }));
    }

    async uploadFile(file: File) {
        const validationError = this.validateFile(file);
        if (validationError) throw new Error(validationError);

        const fileName = `${Date.now()}.${file.name.split(".").pop()}`;
        const path = `${this.folder}/${fileName}`;

        const { error } = await supabase.storage.from(this.bucket).upload(path, file, { upsert: true });
        if (error) throw error;

        return { url: this.getPublicUrl(path), path };
    }

    async replaceFile(file: File, oldPath: string) {
        if (!oldPath) throw new Error("Missing oldPath");

        const validationError = this.validateFile(file);
        if (validationError) throw new Error(validationError);

        const { error: deleteError } = await supabase.storage.from(this.bucket).remove([oldPath]);
        if (deleteError) throw deleteError;

        const newPath = `${this.folder}/${Date.now()}.${file.name.split(".").pop()}`;
        const { error } = await supabase.storage.from(this.bucket).upload(newPath, file);
        if (error) throw error;

        return { url: this.getPublicUrl(newPath), path: newPath };
    }

    async deleteFile(path: string) {
        if (!path) throw new Error("Missing path");

        const { error } = await supabase.storage.from(this.bucket).remove([path]);
        if (error) throw error;

        return { success: true };
    }

    async listFilesPaginated(page = 1, pageSize = 10) {
        // 1️⃣ List all files
        const { data, error } = await supabase
            .storage
            .from(this.bucket)
            .list(this.folder, { sortBy: { column: 'created_at', order: 'desc' } });

        if (error) throw error;

        // 2️⃣ Total count
        const total = data?.length ?? 0;

        // 3️⃣ Calculate pagination
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const paginatedFiles = (data ?? []).slice(start, end).map((file) => ({
            name: file.name,
            url: this.getPublicUrl(`${this.folder}/${file.name}`),
        }));

        return {
            contents: paginatedFiles,
            page,
            pageSize,
            total,
            totalPages: total > 0 ? Math.ceil(total / pageSize) : 0,
            hasNext: page * pageSize < total,
        };
    }

}
