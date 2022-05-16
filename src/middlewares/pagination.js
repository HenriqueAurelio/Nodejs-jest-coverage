const prisma = require('../data/prisma');

function paginatedResults(model) {
  return async (req, res, next) => {
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await prisma[model].count({})))
      results.next = {
        page: page + 1,
        limit: limit
      };

    if (startIndex > 0)
      results.previous = {
        page: page - 1,
        limit: limit
      };
    try {
      results.results = await prisma[model].findMany({
        skip: startIndex,
        take: limit
      });

      res.paginatedResults = results;
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    next();
  };
}

module.exports = paginatedResults;
