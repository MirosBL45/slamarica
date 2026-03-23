export enum MemberStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface IMember {
  id: string;
  name: string;
  status: MemberStatus;
  role: MemberRole;
}
