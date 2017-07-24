module.exports = function notFound(req, res) {
    console.log('req is', req);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.statusMessage = `${res.statusCode} not found`;
    res.end(res.statusMessage);
};