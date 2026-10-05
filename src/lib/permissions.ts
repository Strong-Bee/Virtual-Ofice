export const workspaceRoles=["OWNER","ADMIN","DEPARTMENT_SUPERVISOR","MEMBER","GUEST"] as const;
export type WorkspaceRole=(typeof workspaceRoles)[number];
const rank:Record<WorkspaceRole,number>={OWNER:50,ADMIN:40,DEPARTMENT_SUPERVISOR:30,MEMBER:20,GUEST:10};
export function hasWorkspaceRole(actual:WorkspaceRole,required:WorkspaceRole){return rank[actual]>=rank[required]}