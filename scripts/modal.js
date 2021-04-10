$(document).ready(function() {
  // MODAL
  var modalText = {
    dil: {
      title: 'DIL',
      tag: 'Tableau Web Data Connector.',
      detail:
        'It is an integration layer which binds the data from different sources into a single unified view with the help of several microservices which includes Data service layer, Data picker UI, Tableau Web data connector UI and tableau web data connector service.'
    },
    crspng: {
      title: 'CRSP-NG',
      tag: 'Common Remoe Service Platform- Next Generation.',
      detail:
        'Common remote service platform-next generation (cRSP-NG project) is a web application developed for Siemens clients, which is used by technicians to remotely connect to the devices to know the fault, or to configure or upgrade the device rather than visiting the site where the device is placed. I worked on Backend to create Rest API using Java, Spring boot, Spring data, postgresql.'
    },
    userManagement: {
      title: 'Site Companion',
      tag: 'User Management / Site Companion.',
      detail:
        'Site Companion is used for the user management which helps user to gain access to multiple project and multiple application and it also helps user to update based on the requirements. '
    },
    rcs: {
      title: 'Change Healthcare',
      tag: 'Revenue Cycle Solution.',
      detail:
        'Revenue Cycle Solutions (RCS): The Main functionality of this application is submitting the Claims from provider to payer and getting response from payer to provider in the form of EDI files.'
    },
    iqvia: {
      title: 'TechOps',
      tag: 'IQVIA - TechOps.',
      detail:
        'The Project mainly deals with PMT( Patient Management Tool ) application. It is used by “American Heart Association” (AHA) related Organizations. This is used to capture the heart patients details to their PMT repository and further Measure calculation purpose. Measures are different types of studies related to Heart like Stroke Study, Heart Failure Study, etc.'
    },
    cotiviti: {
      title: 'Verscend-',
      tag: 'Verscend- BUSF.',
      detail:
        'Business Unit Standard format Application is Analytics application which leverages unparalleled clinical and financial data-sets to deliver deep insight into the performance of the healthcare system. It includes various Business Units such as Payment Accuracy, Risk Adjustment, and Quality Intelligence. This Application helps end user to create various Client and Product based on the selected business unit.'
    },
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
