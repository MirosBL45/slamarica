export interface IMember {
  id: string;
  name: string;
  status: "active" | "inactive";
  role: "admin" | "member";
}
