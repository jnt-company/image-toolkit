// ! make sure to update modal.html with any changes
const modalHtml =
    '<div id="image-toolkit" class="modal fade" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><img id="guillotine-picture" class="img-fluid"><div class="controls"><ul class="pl-0 d-flex justify-content-around"><li>Rotate Left</li><li>Zoom Out</li><li>Fit Image</li><li>Zoom In</li><li>Rotate Right</li></ul><div class="tool-icons d-flex justify-content-around w-100"><a id="rotate_left" title="Rotate Counter-Clockwise"><i class="fas fa-undo"></i></a><a id="zoom_out" title="Zoom Out"><i class="fa fa-search-minus fa-lg"></i></a><a id="fit" title="Fit Image"><i class="fa fa-arrows-alt fa-lg"></i></a><a id="zoom_in" title="Zoom In"><i class="fa fa-search-plus fa-lg"></i></a><a id="rotate_right" title="Rotate Clockwise"><i class="fas fa-redo"></i></a></div><p style="padding:10px"><b>Larger</b> photos than needed will result in a better quality photo. Also, we encourage you to only <b>scale once</b>, as consecutive scales can <b>reduce quality</b>.</p></div></div><div class="modal-footer"><a id="close" href="#" class="btn" data-bs-dismiss="modal" data-dismiss="modal">Close</a><a id="image-toolkit-save" href="#" class="btn btn-primary">Save Photo</a></div></div></div></div>';

import './guillotine.js';

if (!document.getElementById('image-toolkit')) {
    var modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal);
}

openToolkitFileReader.bound = false;
$(document).ready(function () {
    $('.image-toolkit').on('change', function (e) {
        console.log('changed!');
        var img = URL.createObjectURL(e.target.files[0]);

        var width = $(this).data('width');
        var height = $(this).data('height');
        if ($(this).data('transformation')) {
            var transformation = $('#' + $(this).data('transformation'));
        } else {
            var transformation = $('#' + $(this).attr('name') + '_transformation');
        }

        var test = new Image();
        test.src = img;
        test.onload = function () {
            if (test.width != width || test.height != height) {
                openToolkitFileReader(img, width, height, transformation);
            }
        };
    });
});

/**
 * Creates a new filereader to properly display selected image in a guillotine plugin instance
 *
 * @param source			File select box to pull image from.
 * @param width				Width of cropped photo
 * @param height			Height of cropped photo
 * @param transformation    HTML Input element to store transformation details
 *
 * Note: User can't change crop dimensions, only what is displayed within them.
 */
function openToolkitFileReader(source, width, height, transformation) {
    // Instantiates the filereader and updates the <img> src.
    var picture = $('#guillotine-picture');
    picture.attr('src', source);

    // Bind buttons to guillotine actions if openToolkit.bound is false.
    if (!openToolkitFileReader.bound) {
        openToolkitFileReader.bound = true;
        $('#rotate_left').click(function () {
            picture.guillotine('rotateLeft');
        });
        $('#rotate_right').click(function () {
            picture.guillotine('rotateRight');
        });
        $('#fit').click(function () {
            picture.guillotine('fit');
        });
        $('#zoom_in').click(function () {
            picture.guillotine('zoomIn');
        });
        $('#zoom_out').click(function () {
            picture.guillotine('zoomOut');
        });
    }

    // When picture is fully loaded run necessary guillotine code
    picture.on('load', function () {
        //Remove any guillotine instance if there is one.
        if (picture.guillotine('instance')) {
            picture.guillotine('remove');
        }

        // Initialize plugin (with desired crop size and custom event)
        picture.guillotine({ width: width, height: height });
    });
    var toolkit = $('#image-toolkit');
    toolkit.modal('show');
    toolkit.find('#image-toolkit-save').on('click', function () {
        var data = JSON.stringify(picture.guillotine('getData'));
        transformation.val(data);
        toolkit.modal('hide');
        // toolkit.hide();
    });
}
