import { NextRequest, NextResponse } from "next/server";
import {SupabaseStorageService} from "@/lib/supabase/services/SupabaseStorageService";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ANY} from "@/utils/commons/type";

const storageService = new SupabaseStorageService();

// GET: List files
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = Number(url.searchParams.get("page") ?? 1);
        const pageSize = Number(url.searchParams.get("pageSize") ?? 10);

        const files = await storageService.listFilesPaginated(page, pageSize);
        return NextResponse.json(files);
    } catch (err: ANY) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
// POST: Upload new file
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        const result = await storageService.uploadFile(file);
        return NextResponse.json(result);
    } catch (err: ANY) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// PUT: Replace file
export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const oldPath = formData.get("oldPath") as string;

        const result = await storageService.replaceFile(file, oldPath);
        return NextResponse.json(result);
    } catch (err: ANY) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// DELETE: Delete file
export async function DELETE(req: NextRequest) {
    try {
        const { path } = await req.json();
        const result = await storageService.deleteFile(path);
        return NextResponse.json(result);
    } catch (err: ANY) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
