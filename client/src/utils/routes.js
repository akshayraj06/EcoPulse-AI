export function getRoleDashboard(role) {
  if (role === "admin") {
    return "/admin";
  }

  if (role === "worker") {
    return "/worker";
  }

  if (role === "supervisor") {
    return "/supervisor";
  }

  return "/dashboard";
}
