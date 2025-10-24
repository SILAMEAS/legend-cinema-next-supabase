// app/api/banner/[id]/route.ts
import { supabaseService } from "@/lib/supabase/services/supabase.service";
import { EnumTableName } from "@/utils/enum/EnumTable";
import { EnumTableColum } from "@/utils/enum/EnumTableColum";
import { ANY } from "@/utils/commons/type";

export async function PUT(
    request: Request,
    // error when build ;  { params }: { params: { id: string } }
    { params }: ANY
) {
    try {
        const id = Number(params?.id);
        if (!id || isNaN(id)) {
            return Response.json({ error: "Invalid or missing id" }, { status: 400 });
        }

        const body = await request.json();
        const { image, alt, link, order, active } = body;

        // 🧩 Prepare update object — only include defined fields
        const updateData: Record<string, ANY> = {};
        if (image !== undefined) updateData[EnumTableColum.IMAGE] = image;
        if (alt !== undefined) updateData[EnumTableColum.ALT] = alt;
        if (link !== undefined) updateData[EnumTableColum.LINK] = link;
        if (order !== undefined) updateData[EnumTableColum.ORDER] = order;
        if (active !== undefined) updateData[EnumTableColum.ACTIVE] = active;

        if (Object.keys(updateData).length === 0) {
            return Response.json({ error: "No valid fields provided to update" }, { status: 400 });
        }

        // ✅ Use supabaseService update method
        const result = await supabaseService.update({
            tableName: EnumTableName.Banner,
            key: EnumTableColum.ID,
            value: id,
            data: updateData,
            serverTrusted: true // optional, if using service role
        });

        if (!result.data) {
            return Response.json({ error: result.error || "Row not found" }, { status: 404 });
        }

        return Response.json({ message: "✅ Banner updated successfully", data: result.data }, { status: 200 });

    } catch (error) {
        console.error("❌ Unexpected error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
