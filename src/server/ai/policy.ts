import {z} from "zod";
export const aiAutonomySchema=z.enum(["ASSISTANT","SUGGEST","EXECUTE_WITH_APPROVAL","LIMITED_AUTONOMOUS","HIGHLY_AUTONOMOUS"]);
export const aiRiskSchema=z.enum(["LOW","MEDIUM","HIGH","CRITICAL"]);
export function requiresApproval(risk:z.infer<typeof aiRiskSchema>,autonomy:z.infer<typeof aiAutonomySchema>){if(risk==="CRITICAL"||risk==="HIGH")return true;return autonomy==="EXECUTE_WITH_APPROVAL"}