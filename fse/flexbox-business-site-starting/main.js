$(document).ready(function() {
  $(".faq-question").click(function() {
    var $arrow = $(this).find(".faq-arrow"); // Find the arrow image within the clicked question
    var $answer = $(this).next(".faq-answer");

    // Slide toggle the answer and then check its visibility to toggle the arrow
    $answer.slideToggle(400, function() {
      // After the toggle animation completes, check if the answer is now visible
      if ($answer.is(":visible")) {
        $arrow.attr("src", "./assets/icons/chevron-up.svg"); // Change to up arrow when visible
        $arrow.attr("alt", "Collapse");
      } else {
        $arrow.attr("src", "./assets/icons/chevron-down.svg"); // Change to down arrow when hidden
        $arrow.attr("alt", "Expand");
      }
    });
  });
});