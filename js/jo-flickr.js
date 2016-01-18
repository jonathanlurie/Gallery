/*
* Jonathan Lurie Gallery
* https://github.com/jonathanlurie/Gallery
*
* Based on the work of Sebastian Tschan
* https://github.com/blueimp/Gallery
*
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/MIT
*/


// JO: links
// https://www.flickr.com/services/api/misc.urls.html
// https://www.flickr.com/services/api/explore/flickr.photosets.getPhotos


$("#facebookShare").attr("href", "https://www.facebook.com/sharer/sharer.php?u="+window.location.href);
$("#twitterShare").attr("href", "http://www.twitter.com/share?url="+window.location.href);

// press space bar to launch the diaporama from the 1st image
window.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    console.log("SPACE");

    if (!$("#blueimp-gallery").hasClass("blueimp-gallery-display")) {
        $( "#links").children().first().trigger( "click" );
    }

  }
};


$(function () {
    'use strict';

    $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', true);

    // default fullscreen state
    $('#blueimp-gallery').data('fullScreen', $("#fullscreen-checkbox").is(':checked'));


    // Load demo images from flickr:
    $.ajax({
        // Flickr API is SSL only:
        // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
        url: 'https://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            //method: 'flickr.interestingness.getList',
            method: 'flickr.photosets.getPhotos',
            photoset_id: flickrPhotosetID, // best of 2015
            //photoset_id: '72157653629710298', // life thread
            //photoset_id: '72157661224382223',  // importation automatique
            user_id: flickrUserID,
            extras: 'description',
            api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {
        var linksContainer = $('#links'),
            baseUrl;

            console.log(result);
        // Add the demo images as links with thumbnails to the page:
        $.each(result.photoset.photo, function (index, photo) {
            console.log(photo);

            //console.log(photo.description._content);

            baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
                photo.server + '/' + photo.id + '_' + photo.secret;


            /*
            // Start EXIF extract (works but useless)
            var currentPhotoID = photo.id;
            var currentPhotoSecret = photo.secret;

            $.ajax({

                url: 'https://api.flickr.com/services/rest/',
                data: {
                    format: 'json',
                    method: 'flickr.photos.getExif',
                    photo_id: currentPhotoID,
                    secret: currentPhotoSecret,
                    api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
                },
                dataType: 'jsonp',
                jsonp: 'jsoncallback'
            }).done(function (result) {
                var exifArray = result.photo.exif;

                    for(var i=0; i< exifArray.length; i++){
                        if(exifArray[i].label.indexOf('GPS') > -1){
                            console.log(i);
                        }
                    }
                    console.log(result);
            });
            // END EXIF extact
            */


            $('<a/>')
                .append($('<img>').prop('src', baseUrl + '_n.jpg').addClass('squareImage'))
                .prop('href', baseUrl + '_h.jpg')
                .prop('title', photo.description._content)
                //.prop('title', photo.title)
                .attr('data-gallery', '')
                .appendTo(linksContainer);
        });
    });

    $('#fullscreen-checkbox').on('change', function () {
        $('#blueimp-gallery').data('fullScreen', $(this).is(':checked'));
    });


    $('#image-gallery-button').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery($('#links a'), $('#blueimp-gallery').data());
    });



});
