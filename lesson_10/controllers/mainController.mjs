class MainPage {
	static mainPageInfo(req, res) {
		res.render('index', { title: 'Dream Car', user: req.user })
	}
}

export default MainPage
