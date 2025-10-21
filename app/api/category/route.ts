import { EnumTableName } from "@/utils/enum/EnumTable";
import { getPaginationParams } from "@/utils/commons/getPaginationParams";
import { fetchPaginatedData } from "@/utils/commons/fetchPaginatedData";
import { EnumSort } from "@/utils/enum/EnumSort";

export async function GET(request: Request) {
    try {
        // ✅ Extract headers
        const userAgent = request.headers.get("user-agent") || "Unknown";

        console.log("🔍 Incoming Request Info:", {
            method: request.method,
            url: request.url,
            userAgent, // ✅ Log user-agent
        });

        const { page, pageSize, search, searchColumn } = getPaginationParams(request);

        const result = await fetchPaginatedData(EnumTableName.Category, {
            page,
            pageSize,
            searchColumn,
            searchValue: search,
            orderDirection: EnumSort.ASC,
        });

        return Response.json(result);
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
