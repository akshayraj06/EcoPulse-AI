const validRoles = ["citizen", "worker", "supervisor", "admin"];

export const validateRegister = (req, res, next) => {
  const { name, email, password, role = "citizen" } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    next(new Error("Name, email and password are required"));
    return;
  }

  if (password.length < 6) {
    res.status(400);
    next(new Error("Password must be at least 6 characters"));
    return;
  }

  if (!validRoles.includes(role)) {
    res.status(400);
    next(new Error("Invalid role selected"));
    return;
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    next(new Error("Email and password are required"));
    return;
  }

  next();
};
