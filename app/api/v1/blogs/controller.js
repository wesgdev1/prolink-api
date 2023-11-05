export const create = async (req, res) => {
  res.status(201);
  res.json({
    data: {},
  });
};

export const getAll = async (req, res) => {
  res.json({ data: [] });
};

export const read = async (req, res) => {
  res.json({ data: {} });
};

export const update = async (req, res) => {
  res.json({ data: {} });
};

export const remove = async (req, res) => {
  res.status(204);
  res.end();
};
