// Education & Experience Section Logic
document.addEventListener('DOMContentLoaded', function() {
    const yearPicker = document.getElementById('years');
    const selectedYearDiv = document.getElementById('selected-year');
    const currentYear = new Date().getFullYear();
    let selectedYear = currentYear;

    // Populate year picker with years from current year to 2015
    for (let year = currentYear; year >= 2015; year--) {
        const yearDiv = document.createElement('div');
        yearDiv.textContent = year;
        yearDiv.classList.add('year');
        if (year === currentYear) {
            yearDiv.classList.add('selected');
        }
        yearDiv.addEventListener('click', function() {
            selectedYear = year;
            updateYearPicker();
            scrollToYear(yearDiv);
        });
        yearPicker.appendChild(yearDiv);
    }

    // Set default year to current year
    selectedYearDiv.textContent = currentYear;
    updateYearPicker();

    // Update year picker on scroll
    document.getElementById('year-picker').addEventListener('scroll', function() {
        const yearDivs = document.querySelectorAll('.year');
        const scrollTop = this.scrollTop;
        const selectedIndex = Math.round(scrollTop / yearDivs[0].offsetHeight);
        selectedYear = parseInt(yearDivs[selectedIndex].textContent);
        updateYearPicker();
    });

    function updateYearPicker() {
        const yearDivs = document.querySelectorAll('.year');
        yearDivs.forEach(div => div.classList.remove('selected'));
        const selectedDiv = Array.from(yearDivs).find(div => parseInt(div.textContent) === selectedYear);
        selectedDiv.classList.add('selected');
        selectedYearDiv.textContent = selectedYear;

        if(selectedYear > 2021){
            $('.coditas').show();
            $('.engg').hide();
            $('.college').hide();
            $('.school').hide();
        }
        else if(selectedYear <= 2021 && selectedYear > 2017){
            $('.coditas').hide();
            $('.engg').show();
            $('.college').hide();
            $('.school').hide();
        }
        else if(selectedYear <= 2017 && selectedYear > 2015){
            $('.coditas').hide();
            $('.engg').hide();
            $('.college').show();
            $('.school').hide();
        }
        else{
            $('.coditas').hide();
            $('.engg').hide();
            $('.college').hide();
            $('.school').show();
        }
    }

    function scrollToYear(yearDiv) {
        const offset = yearDiv.offsetTop - (document.getElementById('year-picker').offsetHeight / 2) + (yearDiv.offsetHeight / 2);
        document.getElementById('year-picker').scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
});

// Certifications Logic
document.addEventListener("DOMContentLoaded", function() {
    const certificates = [
        "assets/images/certificates/certificate1.jpg",
        "assets/images/certificates/certificate2.jpg",
        "assets/images/certificates/certificate3.jpg",
        "assets/images/certificates/certificate4.jpg",
        "assets/images/certificates/certificate5.jpg",
        "assets/images/certificates/certificate6.jpg",
        "assets/images/certificates/certificate7.jpg",
        "assets/images/certificates/certificate8.jpg",
        "assets/images/certificates/certificate9.jpg",
        "assets/images/certificates/certificate10.jpg",
        "assets/images/certificates/certificate11.jpg",
        "assets/images/certificates/certificate12.jpg",
        "assets/images/certificates/certificate13.jpg"
    ];

    let currentIndex = 0;

    const certificateScreen = document.querySelector(".certificate-screen");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const fullscreenButton = document.getElementById("fullscreen-button");

    function updateImages(direction) {
        if (direction == 'right') {
            certificateScreen.innerHTML = `
                <img src="${certificates[(currentIndex - 1 + certificates.length) % certificates.length]}" class="previous fade-in opacity50" alt="Certificate">
                <img src="${certificates[currentIndex]}" class="current slideFromRight" alt="Certificate">
                <img src="${certificates[(currentIndex + 1) % certificates.length]}" class="next slide-right" alt="Certificate">
            `;
        } else if (direction == 'left') {
            certificateScreen.innerHTML = `
                <img src="${certificates[(currentIndex - 1 + certificates.length) % certificates.length]}" class="previous slide-left" alt="Certificate">
                <img src="${certificates[currentIndex]}" class="current slideFromLeft slideFromLeftOut" alt="Certificate">
                <img src="${certificates[(currentIndex + 1) % certificates.length]}" class="next fade-in opacity50" alt="Certificate">
            `;
        } else {
            certificateScreen.innerHTML = `
                <img src="${certificates[(currentIndex - 1 + certificates.length) % certificates.length]}" class="previous slide-left opacity50" alt="Certificate">
                <img src="${certificates[currentIndex]}" class="current" alt="Certificate">
                <img src="${certificates[(currentIndex + 1) % certificates.length]}" class="next slide-right opacity50" alt="Certificate">
            `;
        }
        document.getElementById("fullscreen-button").addEventListener("click", toggleFullScreen);
    }

    function navigateLeft() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : certificates.length - 1;
        updateImages('left');
    }

    function navigateRight() {
        currentIndex = (currentIndex < certificates.length - 1) ? currentIndex + 1 : 0;
        updateImages('right');
    }

    function toggleFullScreen() {
        const certificateImage = document.querySelector(".certification-container");
        if (!document.fullscreenElement) {
            certificateImage.requestFullscreen().then(() => {
                fullscreenButton.textContent = "Exit Full Screen";
            }).catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    leftArrow.addEventListener("click", navigateLeft);
    rightArrow.addEventListener("click", navigateRight);

    document.addEventListener("fullscreenchange", function() {
        if (!document.fullscreenElement) {
            fullscreenButton.textContent = "Full Screen";
            updateImages();
        } else {
            fullscreenButton.textContent = "Exit Full Screen";
        }
    });

    updateImages();
});


// Copy Button Logic
$(document).ready(function() {
    var timeoutId;

    $('.copy-button').on('click', function() {
        // Get the email text element
        var emailTextElement = $('.email-text');
        var emailText = emailTextElement.text();

        // Create a temporary textarea element to copy the text
        var tempTextarea = $('<textarea>');
        tempTextarea.val(emailText).appendTo('body').select();
        document.execCommand('copy');
        tempTextarea.remove();

        // Change the text to "Copied!"
        emailTextElement.text('Copied!');

        // Disable the button
        var copyButton = $(this);
        copyButton.prop('disabled', true);

        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Change the text back to the original email after 3 seconds and re-enable the button
        timeoutId = setTimeout(function() {
            emailTextElement.text(emailText);
            copyButton.prop('disabled', false);
        }, 3000);
    });
});

// Download Resume

$(document).ready(function() {
    $('.cv-button').on('click', function() {
        // Path to the PDF file
        var pdfPath = "assets/resources/resume.pdf";

        // Open the PDF in a new tab
        window.open(pdfPath, '_blank');

        // Create a temporary anchor element to trigger the download
        var tempAnchor = $('<a>');
        tempAnchor.attr('href', pdfPath);
        tempAnchor.attr('download', 'ramanadakurkar_resume.pdf');
        $('body').append(tempAnchor);
        tempAnchor[0].click();
        tempAnchor.remove();
    });
});

// document.addEventListener("DOMContentLoaded", () => {
//     const observer = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if(entry.isIntersecting){
//                 entry.target.classList.add('in-view');
//                 return;
//             }
//             entry.target.classList.remove('in-view');
//         });
//     });

//     const allAnimatedElements = document.querySelectorAll('.animate');

//     allAnimatedElements.forEach((element) => observer.observe(element));
// });






