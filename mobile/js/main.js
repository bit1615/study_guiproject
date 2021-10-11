$(function () {
  //메인화면
  if ($(".main_slide_wrapper").length) {
    var swiper = new Swiper(".main_slide_container", {
      slidesPerView: 1,
      spaceBetween: 25,
      centeredSlides: true,
      centeredSlidesBounds: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  //홈 카테고리 슬라이드
  if ($(".category_menus").length) {
    // var swiper = new Swiper(".category_menus", {
    //   slidesPerView: 2,
    //   spaceBetween: 27,
    // });

    $(".category_slider").slick({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      centerMode: false,
      variableWidth: true,
    });
  }

  //히스토리 뒤로가기
  $(".go_back").click(function (e) {
    e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      location.href = "./index.html";
    }
  });

  //Aside Menu
  if ($(".aside_menu_toggle").length) {
    const asideToggleBtn = $(".aside_menu_toggle");
    asideToggleBtn.click(function () {
      $("body").toggleClass("aside_active");
    });
    //Aside Menu Accodion
    const asideMenuList = $(".categories > li");
    asideMenuList.click(function () {
      $(this).find("ul").slideToggle();
      $(this).siblings("li").find("ul").slideUp();
    });
  }

  //상세페이지 썸네일 슬라이드
  if ($(".product_thumb_slides").length) {
    var swiper = new Swiper(".product_thumb_container", {
      slidesPerView: 1,
      spaceBetween: 13,
      width: 138,
    });

    // 이미지 변경하기
    const thumbImg = $(".product_thumb_slides li img");
    const targetImg = $(".product_img_top img");

    thumbImg.click(function () {
      const targetImgUrl = $(this).attr("src");
      targetImg.attr("src", targetImgUrl);
    });
  }

  // 상세페이지 별표
  if ($(".review_content").length) {
    const rating = $(".review_content li .rating");

    /* 
      rating 마다 할일 
        각각이 가지고 있는 별점을 변수명 starscore ('3')에 저장한다.
        svg nth:child 의 1~ 3번째 color를 f05522로 변경한다.
    */
    rating.each(function () {
      const starscore = $(this).attr("data-rate");
      $(this)
        .find("i:nth-child(-n+" + starscore + ")")
        .css({ color: "#f05522" });
    });
  }

  //장바구니 합계 구하기
  if ($(".cart_list").length) {
    let cartList = $(".cart_list li");
    const targetTotal = $(".total_price .price");
    const itemDelBtn = cartList.find($(".cart_item_del"));
    const shippingCost = parseInt(
      // a.replace(b,c)
      $(".shipping .price").text().replace("$ ", "")
    );
    let totalPrice = 0;

    // 이 페이지를 열리자 마자 합계를 다시 계산
    calcTotal();

    // 수량을 바꾸면 합계를 다시 계산
    $(".qty input").change(calcTotal);

    // x를 눌러서 아이템을 삭제해도 함계를 다시 계산
    itemDelBtn.click(function () {
      const userAction = confirm("장바구니에서 해당 상품을 삭제하시겠습니까?");
      if (userAction == true) {
        $(this).parent().remove();
        calcTotal();
      }
    });

    //합계 구하기 함수
    function calcTotal() {
      cartList = $(".cart_list li");
      totalPrice = 0;
      // console.log(cartList.length);

      if (cartList.length > 0) {
        cartList.each(function () {
          const unitPrice = parseInt(
            $(this).find(".unit_price").text().replace("$ ", "")
          );
          const unitCount = $(this).find("input").val();

          /*
          변수명 totalPrice에 해당 아이템의 단가 x 해당 아이템의 개수(unitCount)를 저장
          totalPrice + grandTotal의 값을 targetTotal의 내용으로 교체한다.
          */

          totalPrice += unitPrice * unitCount;
          const subTotal = (totalPrice + shippingCost).toLocaleString("en", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          });

          const grandTotal = "$ " + subTotal;
          targetTotal.text(grandTotal);
        });
      } else {
        targetTotal.text("$ 0.00");
      }
    } //calcTotal
  } //장바구니 합계 구하기 끝

  //검색
}); //document.ready
