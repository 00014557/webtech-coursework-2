exports.getError = (req, res, next) => {
    res.status(404).render('errorPage/error', {
      titleName: '404'
    });
};