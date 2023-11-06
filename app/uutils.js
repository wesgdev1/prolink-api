import { configuration } from "./config.js";

const { pagination, order } = configuration;

export const parsePagination = ({
  limit = pagination.limit,
  offset = pagination.offset,
}) => ({
  limit: !Number.isNaN(Number.parseInt(limit))
    ? Number.parseInt(limit)
    : pagination.limit,
  offset: !Number.isNaN(Number.parseInt(offset))
    ? Number.parseInt(offset)
    : pagination.offset,
});

export const parseOrder = ({
  fields = [],
  orderBy = order.orderBy,
  direction = order.direction,
}) => ({
  orderBy: fields.includes(orderBy) ? orderBy : order.orderBy,
  direction: order.options.includes(direction) ? direction : order.direction,
});
