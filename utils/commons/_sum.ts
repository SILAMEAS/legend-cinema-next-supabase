import {EnumTableName} from "@/utils/enum/EnumTable";
import {createClient} from "@/lib/supabase/client";
import {ANY} from "@/utils/commons/type";

export async function _sum<T>({
                                  tableName,
                                  column,
                              }: {
    tableName: EnumTableName;
    column: string;
}) {
    const supabase = createClient();

    const {data, error} = await supabase
        .from(tableName)
        .select(column);

    if (error) throw error;

    const total = (data as ANY[]).reduce((sum, row) => sum + (row[column] ?? 0), 0);
    return total;
}
