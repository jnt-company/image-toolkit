# Image Toolkit

<small>This is intended to be used on sites hosted by JNT Company. This is created and maintaned specifically for our internal use. Non-customized version is available at [matiasgali/guillotine](https://github.com/matiasgali/guillotine)</small>

## Requirements

-   Bootstrap 5
-   jQuery

## Installation

`npm install jnt-image-toolkit`

### JS

`require('jnt-image-toolkit/app.js');`

### SCSS

`@import 'jnt-image-toolkit/app.scss';`

### HTML

#### Required HTML

-   data-height
-   data-width
-   class="image-toolkit"
-   hidden input with an ID of `name`\_transformation
    -   the ID may also be specific in the file input with data-transformation

```html
<input type="file" class="image-toolkit" name="photo" data-height="500" data-width="500" />
<input type="hidden" name="photo_transformation" id="photo_transformation" />
```
