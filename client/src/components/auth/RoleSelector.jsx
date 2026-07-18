export default function RoleSelector({ value, onChange }) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">Role</label>
      <select
        name="role"
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      >
        <option value="citizen">Citizen</option>
        <option value="worker">Worker</option>
        <option value="supervisor">Supervisor</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}
