class Utils {
    static requireRole(groupid) {
        return (req, res, next) => {
            // if (this.authenticate(req, res, next)) {
            if (req.user.groupid == groupid) {
               return next()
            }
            return res.status(403).send("403 Forbidden");
        };
    }
}
module.exports = Utils;