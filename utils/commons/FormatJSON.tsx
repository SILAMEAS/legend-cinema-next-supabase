import { ANY } from "../api/type";

export const FormatJSON=(data:ANY)=>
<pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data, null, 2)}
</pre>