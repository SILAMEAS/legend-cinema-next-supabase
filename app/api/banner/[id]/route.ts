import { createClient } from "@/lib/supabase/server";
import { EnumTableName } from "@/utils/enum/EnumTable";
import {EnumTableColum} from "@/utils/enum/EnumTableColum";
import {ANY} from "@/utils/commons/type";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();
        const id = Number(params.id); // 🔥 get id from route
        const body = await request.json();

        const { image, alt, link, order, active } = body;

        if (!id || isNaN(id)) {
            return Response.json({ error: "Invalid or missing id" }, { status: 400 });
        }

        // 🧩 Prepare update object — filter out undefined fields
        const updateData: Record<string, ANY> = {};
        if (image !== undefined) updateData[EnumTableColum.IMAGE] = image;
        if (alt !== undefined) updateData[EnumTableColum.ALT] = alt;
        if (link !== undefined) updateData[EnumTableColum.LINK] = link;
        if (order !== undefined) updateData[EnumTableColum.ORDER] = order;
        if (active !== undefined) updateData[EnumTableColum.ACTIVE] = active;

        if (Object.keys(updateData).length === 0) {
            return Response.json(
                { error: "No valid fields provided to update" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from(EnumTableName.Banner)
            .update(updateData)
            .eq(EnumTableColum.ID, id)
            .select()
            .single();

        if (error) {
            console.error("❌ Supabase update error:", error);
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json(
            { message: "✅ Banner updated successfully", data },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
