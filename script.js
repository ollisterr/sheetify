var upmodulate = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
var downmodulate = ['c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab', 'a', 'bb', 'b']

function modulate(cents) {
  $('.chord-input').each( function() {
    var value = this.val();
    var original = value;
    var scale = upmodulate;
    if (value) {
      value = value.toLowerCase()
      if (value.length >= 2) {
        if (value.charAt(1) == 'b') {
          scale = downmodulate;
          value = value.substring(0,2);
        } else if (value.charAt(1) == '#') {
          value = value.substring(0,2);
        } else {
          value = value.substring(0, 1);
        }
      }
      if (scale.indexOf(value) > 0) {
        originalParsed = value;
        value = scale[ (scale.indexOf(value) + 12 + cents) % 12 ];
        this.val() = value.toUpperCase() + original.substring(originalParsed.length - 1, original.length);
      }
    }
  });
}



function printPage() {
  window.print();
}

function screenshot() {
  $(".hide-at-print").hide();
  $(".section-tag:not(.active-section-tag)").hide();
  $(".bar").toggleClass("slidein");
	html2canvas(document.getElementById("container")).then( function(canvas) {
    // document.body.append(canvas);

    var title = $("#title").val();
    var imgData = canvas.toDataURL("image/jpeg", 2.0);
    var image = document.createElement('img');
    image.src = imgData;
    var doc = new jsPDF("p", "mm", "a4");
    doc.setProperties({
    	title: title,
    	subject: 'Music sheet for ' + title,
    });
    var width = doc.internal.pageSize.getWidth();

    doc.addImage(imgData, 'JPEG', 0, 0, width, image.height);
    doc.save(title + ".pdf");

    $(".hide-at-print").show();
    $(".section-tag:not(.active-section-tag)").show();
    $(".bar").toggleClass("slidein");
  });
}

function createFromTemplate(template, target) {
  var clone = $(template).clone();
  clone.removeAttr('id');
  clone.show()
  target.before( clone );
  return clone;
}

function init() {
  createFromTemplate("#section-template", $("#bottom-box"));

}


/* EVENT LISTENERS */
$(document).ready( function() {

  /* PRINT */
  $('#print').click( function() {
    screenshot();
  });

  /* ADD BAR */
  $('#container').on('click', '.add-bar', function() {
    createFromTemplate("#bar-template", $(this));
  });
  $('#add-bar-inbetween').click( function() {
    var newComer = createFromTemplate("#bar-template", $(this).parent().parent());
    $(this).parent().appendTo(newComer);
  });
  $('#remove-bar-inbetween').click( function() {
    var bar = $(this).parent().parent();
    if (bar.parent().children(".bar").length > 1) {
      // alert(bar.parent().children(".bar").length);
      // alert(bar.is('last-of-type'));
      if (!bar.is('.bar:last-of-type')) $(this).parent().appendTo(bar.next());
      bar.remove();
    }
  });

  /* ADD SECTION */
  $("#add-section").click( function() {
    createFromTemplate("#section-template", $("#bottom-box"));
  });

  /* REPEAT */
  $("#container").on('click', '.repeat', function() {
    if ($(this).attr("active")) {
      $(this).removeAttr("active");
      $(this).css("opacity", 0);
    } else {
      $(this).attr("active", "true");
      $(this).css("opacity", 1);
    }
  });


  // SECTION TAG PANEL
  $("#container").on('click', '.section-tag', function() {
    if ($(this).children().length) {
      var parent = $(this).parent();
      var input = $(this).children("input");
      var original = $(this)
      $(this).children("input").focus();

      input.focusout( function() {
        if (input.val() && !original.hasClass("active-section-tag")) {
          original.prependTo(parent);
          parent.children(".active-section-tag").toggleClass("active-section-tag");
          original.toggleClass("active-section-tag");
        } else if (!input.val() && original.hasClass("active-section-tag")) {
          original.toggleClass("active-section-tag");
        }
      })
    } else if ($(this).hasClass("active-section-tag")) {
      $(this).toggleClass("active-section-tag")
    } else {
      var parent = $(this).parent()
      $(this).prependTo(parent);
      parent.children(".active-section-tag").toggleClass("active-section-tag");
      $(this).toggleClass("active-section-tag");
    }
  });

  // BAR SETTINGS PANEL
  $("#container").on( 'mouseenter', '.bar', function() {
    $("#bar-attributes").appendTo($(this));
    $("#bar-attributes").show();
  }).on('mouseleave', '.section', function() {
    $("#bar-attributes").hide();
  });


  init();
});
