import {NextResponse} from "next/server";
import {getConfiguredProviders} from "@/ai/providers/registry";
export async function GET(){return NextResponse.json({providers:getConfiguredProviders()});}