function mobileMenu(menuClassName, menuIconClassName, closeIconClassName, mobileResolution, isMenuSticky, offsetToSticky) {
	var $menu = $(menuClassName);
	var $menuList = $menu.find("ul");
	var $menuLinks = $menu.find("a");
	var $menuIcon = $(menuIconClassName);
	var $closeIcon = $(closeIconClassName);
	var documentWidth = $(document).width();
	var menuIsOpened = false;
	var offset = $menu.outerHeight();
	var scrollPos = 0;

	$(document).on("scroll", onScroll);
	$("a[href^='#']").on("click", scrollTo);
	$(window).on("resize", function () {
		documentWidth = $(document).width();
		if (!menuIsOpened && $(document).width() > mobileResolution) {
			showMenu();
		} else if (menuIsOpened && $(document).width() < mobileResolution) {
			hideMenu();
		}
	});
	$menuIcon.on("click", function () {
		if (!menuIsOpened) {
			showMenu();
		} else {
			hideMenu();
		}
	});

	if ($closeIcon) {
		$closeIcon.on("click", function () {
			if (menuIsOpened) {
				hideMenu();
			}
		});
	}

	$menuLinks.on("click", function () {
		if (documentWidth <= mobileResolution) {
			hideMenu();
		}
	});

	function onScroll(event) {
		scrollPos = $(document).scrollTop();
		if (isMenuSticky && documentWidth > mobileResolution) {
			fixedMenu();
		}

		$menuLinks.each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top - 5 <= scrollPos + offset && refElement.position().top + refElement.height() > scrollPos) {
				$menuLinks.removeClass("active");
				currLink.addClass("active");
			} else {
				currLink.removeClass("active");
			}
		});
	}

	function scrollTo(event) {
		var target = this.hash;
		var $target = $(target);
		if (isMenuSticky && scrollPos > offsetToSticky) {
			offset = $menu.outerHeight() * 2;
		} else {
			offset = $menu.outerHeight();
		}
		event.preventDefault();
		$menuLinks.each(function () {
			$(this).removeClass("active");
		})
		$(this).addClass("active");

		$("html, body").stop().animate({
			'scrollTop': $target.offset().top - offset
		}, 500, "swing", function () {});
	}

	function fixedMenu() {
		if (scrollPos > offsetToSticky) {
			$menu.addClass("fixed-menu");
		} else {
			$menu.removeClass("fixed-menu");
		}
	}

	function showMenu() {
		$menuList.css("display", "flex");
		menuIsOpened = true;
	}

	function hideMenu() {
		$menuList.css("display", "none");
		menuIsOpened = false;
	}
}
